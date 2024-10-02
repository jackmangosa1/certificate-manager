import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/custom-date-input/CustomDateInput';
import CustomSelect from '../../components/custom-select/CustomSelect';
import SupplierSearchModal from '../../components/search-supplier-modal/SearchSupplierModal';
import SupplierLookup from '../../components/supplier-lookup/SupplierLookup';
import PdfViewer from '../../components/pdf-viewer/PdfViewer';
import {
  Certificate,
  CertificateType,
  Participant,
  Comment,
  Supplier,
  CertificateFormData,
} from '../../types/types';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import { useLanguage } from '../../hooks/useLanguage';
import { useCertificateTypes } from '../../hooks/useCertificateTypes';
import ParticipantLookupModal from '../../components/participant-lookup-modal/ParticipantLookupModal';
import Table, { ColumnConfig } from '../../components/table/Table';
import SearchIcon from '../../icons/SearchIcon';
import CrossIcon from '../../icons/CrossIcon';
import { useParticipants } from '../../hooks/useParticipants';
import CommentSection from '../../components/comment-section/CommentSection';
import { useUser } from '../../context/UserContext';
import { formatDate } from '../../utils/convertDate';
import { isBase64 } from '../../utils/convertPDF';

type FormError = {
  name: string;
  certificateTypeName: string;
  validFrom: string;
  validTo: string;
  validRange: string;
  pdfDocumentURL: string;
};

const initialErrorData: FormError = {
  name: '',
  certificateTypeName: '',
  validFrom: '',
  validTo: '',
  validRange: '',
  pdfDocumentURL: '',
};

const initialCertificateData: CertificateFormData = {
  name: '',
  certificateTypeName: '',
  validFrom: '',
  validTo: '',
  pdfDocumentData: '',
  participants: [],
  comments: [],
};

const AddCertificate: React.FC = () => {
  const { translations } = useLanguage();
  const { certificateTypes } = useCertificateTypes();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addCertificate, updateCertificate, getCertificateById } =
    useCertificates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const { selectedUser } = useUser();
  const [certificateData, setCertificateData] = useState<CertificateFormData>(
    initialCertificateData,
  );
  const [editMode, setEditMode] = useState(false);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>(initialErrorData);
  const { removeParticipant } = useParticipants();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setCertificateData((prevData) => ({
      ...prevData,
      name: supplier.name,
    }));
    closeModal();
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        const fetchedCertificate = await getCertificateById(parseInt(id));

        if (fetchedCertificate) {
          setCertificateData((prevData) => ({
            ...prevData,
            ...fetchedCertificate,
            comments: fetchedCertificate.comments || [],
            participants: fetchedCertificate.participants || [],
          }));
          setSelectedParticipants(fetchedCertificate.participants || []);
          setComments(fetchedCertificate.comments || []);
          setEditMode(true);

          if (fetchedCertificate.pdfDocumentData) {
            try {
              const isPDFBase64 = isBase64(fetchedCertificate.pdfDocumentData);
              const base64Data = isPDFBase64
                ? fetchedCertificate.pdfDocumentData
                : btoa(fetchedCertificate.pdfDocumentData);
              setPdfBase64(`data:application/pdf;base64,${base64Data}`);
            } catch (error) {
              console.error('Error processing PDF data:', error);
            }
          }
        }
      }
    };
    fetchCertificate();
  }, [id]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]:
        name === 'certificateTypeName'
          ? (value as CertificateType['certificateTypeName'])
          : value,
    }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: date ? date.toISOString() : '',
    }));
  };

  const handlePdfChange = (pdfFile: File | null) => {
    if (pdfFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPdfBase64(base64);
      };
      reader.readAsDataURL(pdfFile);
    } else {
      setPdfBase64(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = { ...initialErrorData };
    let isValid = true;

    if (!selectedSupplier) {
      newErrors.name = translations.errors.required.supplier;
      isValid = false;
    }
    if (!certificateData.certificateTypeName) {
      newErrors.certificateTypeName =
        translations.errors.required.certificateType;
      isValid = false;
    }
    if (!certificateData.validFrom) {
      newErrors.validFrom = translations.errors.required.validFrom;
      isValid = false;
    }
    if (!certificateData.validTo) {
      newErrors.validTo = translations.errors.required.validTo;
      isValid = false;
    }
    if (
      certificateData.validFrom &&
      certificateData.validTo &&
      new Date(certificateData.validFrom) > new Date(certificateData.validTo)
    ) {
      newErrors.validRange = translations.errors.validRange;
      isValid = false;
    }
    if (!pdfBase64) {
      newErrors.pdfDocumentURL = translations.errors.required.pdfData;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors).find(
        (key) => errors[key as keyof FormError] !== '',
      );
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.focus();
      }
      return;
    }

    try {
      const certificateType = certificateTypes.find(
        (type) =>
          type.certificateTypeName === certificateData.certificateTypeName,
      );

      if (!certificateType) {
        throw new Error('Invalid certificate type');
      }

      const certificateToSave: Certificate = {
        certificateId: editMode && id ? Number(id) : 0,
        supplierId: selectedSupplier?.supplierId || 0,
        certificateTypeId: certificateType.certificateTypeId,
        validFrom: formatDate(certificateData.validFrom),
        validTo: formatDate(certificateData.validTo),
        pdfDocumentData: pdfBase64 ? pdfBase64.split(',')[1] : '',
      };

      console.log('Certificate to save:', certificateToSave);

      if (editMode && id) {
        await updateCertificate(parseInt(id), certificateToSave);
      } else {
        await addCertificate(certificateToSave);
      }

      setErrors(initialErrorData);
      navigate(AppRoutes.Example1);
    } catch (error) {
      console.error('Error saving certificate:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Failed to save certificate. Please try again.',
      }));
    }
  };

  const handleClearSupplier = () => {
    setCertificateData((prevData) => ({
      ...prevData,
      name: '',
    }));
    setSelectedSupplier(null);
  };

  const handleReset = () => {
    setCertificateData(initialCertificateData);
    setSelectedParticipants([]);
    setPdfBase64(null);
    setSelectedSupplier(null);
  };

  const handleOpenParticipantModal = () => {
    setIsParticipantModalOpen(true);
  };

  const handleCloseParticipantModal = () => {
    setIsParticipantModalOpen(false);
  };

  const handleSelectParticipant = (participants: Participant[]) => {
    setSelectedParticipants(participants);
  };

  const handleRemoveParticipant = async (
    certificateId: number,
    participantId: number,
  ) => {
    try {
      await removeParticipant(certificateId, participantId);

      setSelectedParticipants((prevParticipants) =>
        prevParticipants.filter(
          (participant) => participant.participantId !== participantId,
        ),
      );
    } catch (error) {
      console.error('Failed to delete participant:', error);
    }
  };

  const handleCommentsChange = (newComments: Comment[]) => {
    setComments(newComments);
  };

  const participantColumns: ColumnConfig<Participant>[] = [
    {
      header: translations.name,
      accessor: (row) => `${row.firstName} ${row.name}`,
    },
    {
      header: translations.department,
      accessor: (row) => row.department,
    },
    {
      header: translations.plant,
      accessor: (row) => row.plant,
    },
  ];

  return (
    <div className="certificate-form-container">
      <div className="left-side">
        <SupplierLookup
          value={certificateData.name}
          onChange={handleInput}
          error={errors.name}
          onSearch={openModal}
          onClear={handleClearSupplier}
        />
        <SupplierSearchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={handleSupplierSelect}
        />

        <CustomSelect
          id="certificate-type"
          label={translations.certificateType}
          name="certificateTypeName"
          value={certificateData.certificateTypeName}
          onChange={handleInput}
          options={certificateTypes.map((type) => ({
            value: type.certificateTypeName,
            label: type.certificateTypeName,
          }))}
          error={errors.certificateTypeName}
          className="certificate-select"
        />

        <CustomDateInput
          id="start-date"
          label={translations.validFrom}
          name="validFrom"
          value={
            certificateData.validFrom
              ? new Date(certificateData.validFrom)
              : null
          }
          onChange={(date) => handleDateChange('validFrom', date)}
          error={errors.validFrom}
        />

        <CustomDateInput
          id="end-date"
          label={translations.validTo}
          name="validTo"
          value={
            certificateData.validTo ? new Date(certificateData.validTo) : null
          }
          onChange={(date) => handleDateChange('validTo', date)}
          error={errors.validTo}
        />

        {errors.validRange && (
          <p className="error-message">{errors.validRange}</p>
        )}

        {selectedUser ? (
          <CommentSection
            certificateId={Number(id)}
            currentUserName={selectedUser.username}
            initialComments={comments}
            onCommentsChange={handleCommentsChange}
          />
        ) : (
          <p>Select a user first</p>
        )}

        <div className="participants-container">
          <div>
            <label>{translations.assignedUsers}</label>
            <button
              className="add-participants-btn"
              onClick={handleOpenParticipantModal}
            >
              <SearchIcon className="search-partcipant-icon" />
              {translations.addParticipant}
            </button>
          </div>

          {selectedParticipants.length > 0 ? (
            <Table
              columns={participantColumns}
              data={selectedParticipants}
              actionColumn={{
                header: '',
                render: (row) => (
                  <div
                    onClick={() => {
                      handleRemoveParticipant(Number(id), row.participantId);
                    }}
                  >
                    <CrossIcon className="cross-icon" />
                  </div>
                ),
              }}
            />
          ) : (
            <p className="no-data-available">{translations.noDataAvailable}</p>
          )}
          <ParticipantLookupModal
            isOpen={isParticipantModalOpen}
            onClose={handleCloseParticipantModal}
            onSelect={handleSelectParticipant}
            certificateId={Number(id)}
          />
        </div>
      </div>
      <div className="right-side">
        <PdfViewer
          pdfPreview={pdfBase64}
          setPdfPreview={setPdfBase64}
          onPdfChange={handlePdfChange}
          error={errors.pdfDocumentURL}
        />

        <div className="button-container">
          <button
            onClick={handleSave}
            className="save-button"
          >
            {editMode ? translations.update : translations.save}
          </button>
          <button
            onClick={handleReset}
            className="reset-button"
          >
            {translations.reset}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
