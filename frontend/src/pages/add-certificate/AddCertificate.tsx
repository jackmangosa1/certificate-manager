import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/custom-date-input/CustomDateInput';
import CustomSelect from '../../components/custom-select/CustomSelect';
import SupplierSearchModal from '../../components/search-supplier-modal/SearchSupplierModal';
import SupplierLookup from '../../components/supplier-lookup/SupplierLookup';
import PdfViewer from '../../components/pdf-viewer/PdfViewer';
import { CertificateType } from '../../types/types';
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
import { ApiClient } from '../../api/apiClient';

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

const initialCertificateData: ApiClient.GetCertificateDTO =
  new ApiClient.GetCertificateDTO();
initialCertificateData.certificateId = undefined;
initialCertificateData.certificateTypeName = '';
initialCertificateData.name = '';
initialCertificateData.validTo = '';
initialCertificateData.validFrom = '';
initialCertificateData.pdfDocumentData = '';
initialCertificateData.comments = [];
initialCertificateData.participants = [];

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
    ApiClient.ParticipantDTO[]
  >([]);
  const [comments, setComments] = useState<ApiClient.CommentDTO[]>([]);
  const { selectedUser } = useUser();
  const [certificateData, setCertificateData] =
    useState<ApiClient.GetCertificateDTO>(initialCertificateData);
  const [editMode, setEditMode] = useState(false);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>(initialErrorData);
  const { removeParticipant } = useParticipants();
  const [selectedSupplier, setSelectedSupplier] =
    useState<ApiClient.SupplierDTO | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSupplierSelect = (supplier: ApiClient.SupplierDTO) => {
    setSelectedSupplier(supplier);

    setCertificateData((prevData) => {
      const updatedCertificate = new ApiClient.GetCertificateDTO();

      updatedCertificate.certificateId = prevData.certificateId;
      updatedCertificate.name = supplier.name;
      updatedCertificate.certificateTypeName = prevData.certificateTypeName; // Retain existing certificateTypeName
      updatedCertificate.validFrom = prevData.validFrom; // Retain existing validFrom
      updatedCertificate.validTo = prevData.validTo; // Retain existing validTo
      updatedCertificate.pdfDocumentData = prevData.pdfDocumentData; // Retain existing pdfDocumentData
      updatedCertificate.comments = prevData.comments || [];
      updatedCertificate.participants = prevData.participants || [];

      return updatedCertificate;
    });

    closeModal();
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        try {
          const fetchedCertificate = await getCertificateById(parseInt(id));

          if (fetchedCertificate) {
            // Create a new instance of GetCertificateDTO using fetched data
            const newCertificate = new ApiClient.GetCertificateDTO();
            newCertificate.certificateId = fetchedCertificate.certificateId;
            newCertificate.name = fetchedCertificate.name;
            newCertificate.certificateTypeName =
              fetchedCertificate.certificateTypeName;
            newCertificate.validFrom = fetchedCertificate.validFrom;
            newCertificate.validTo = fetchedCertificate.validTo;
            newCertificate.pdfDocumentData = fetchedCertificate.pdfDocumentData;
            newCertificate.comments = fetchedCertificate.comments || [];
            newCertificate.participants = fetchedCertificate.participants || [];

            // Update the certificate data state
            setCertificateData(newCertificate);

            // Update additional states
            setSelectedParticipants(newCertificate.participants || []);
            setComments(newCertificate.comments || []);
            setEditMode(true);

            // Handle PDF base64 data processing
            if (newCertificate.pdfDocumentData) {
              try {
                const isPDFBase64 = isBase64(newCertificate.pdfDocumentData);
                const base64Data = isPDFBase64
                  ? newCertificate.pdfDocumentData
                  : btoa(newCertificate.pdfDocumentData);
                setPdfBase64(`data:application/pdf;base64,${base64Data}`);
              } catch (error) {
                console.error('Error processing PDF data:', error);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching certificate by ID:', error);
        }
      }
    };

    fetchCertificate();
  }, [id]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setCertificateData((prevData) => {
      const updatedCertificate = new ApiClient.GetCertificateDTO(); // Create a new instance
      // Copy previous data to the new instance
      updatedCertificate.certificateId = prevData.certificateId;
      updatedCertificate.name = name === 'name' ? value : prevData.name; // Update name if the input name is "name"
      updatedCertificate.certificateTypeName =
        name === 'certificateTypeName'
          ? (value as CertificateType['certificateTypeName']) // Ensure value is of the right type
          : prevData.certificateTypeName;
      updatedCertificate.validFrom = prevData.validFrom;
      updatedCertificate.validTo = prevData.validTo;
      updatedCertificate.pdfDocumentData = prevData.pdfDocumentData;
      updatedCertificate.comments = prevData.comments;
      updatedCertificate.participants = prevData.participants;

      return updatedCertificate; // Return the new instance
    });
  };

  const handleDateChange = (
    name: 'validFrom' | 'validTo',
    date: Date | null,
  ) => {
    setCertificateData((prevData) => {
      const updatedCertificate = new ApiClient.GetCertificateDTO(); // Create a new instance

      // Copy previous data to the new instance
      updatedCertificate.certificateId = prevData.certificateId;
      updatedCertificate.name = prevData.name;
      updatedCertificate.certificateTypeName = prevData.certificateTypeName;
      updatedCertificate.validFrom =
        name === 'validFrom'
          ? date
            ? date.toISOString()
            : ''
          : prevData.validFrom;
      updatedCertificate.validTo =
        name === 'validTo'
          ? date
            ? date.toISOString()
            : ''
          : prevData.validTo;
      updatedCertificate.pdfDocumentData = prevData.pdfDocumentData;
      updatedCertificate.comments = prevData.comments;
      updatedCertificate.participants = prevData.participants;

      return updatedCertificate; // Return the new instance
    });
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

      if (!certificateType || certificateType.certificateTypeId === undefined) {
        throw new Error('Invalid certificate type');
      }

      if (!selectedSupplier || selectedSupplier.supplierId === undefined) {
        throw new Error('Invalid supplier');
      }

      const certificateToSave = new ApiClient.CreateCertificateDTO();
      certificateToSave.certificateId = editMode && id ? Number(id) : 0;
      certificateToSave.supplierId = selectedSupplier.supplierId;
      certificateToSave.certificateTypeId = certificateType.certificateTypeId;
      certificateToSave.validFrom = certificateData.validFrom
        ? formatDate(certificateData.validFrom)
        : '';
      certificateToSave.validTo = certificateData.validTo
        ? formatDate(certificateData.validTo)
        : '';
      certificateToSave.pdfDocumentData =
        pdfBase64 && pdfBase64.includes(',')
          ? pdfBase64.split(',')[1]
          : pdfBase64 || '';

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
        general:
          error instanceof Error
            ? error.message
            : 'Failed to save certificate. Please try again.',
      }));
    }
  };
  const handleClearSupplier = () => {
    setCertificateData((prevData) => {
      const updatedData = {
        ...prevData,
        name: '',
      } as ApiClient.GetCertificateDTO;

      return updatedData;
    });

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

  const handleSelectParticipant = (
    participants: ApiClient.ParticipantDTO[],
  ) => {
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

  const handleCommentsChange = (newComments: ApiClient.CommentDTO[]) => {
    setComments(newComments);
  };

  const participantColumns: ColumnConfig<ApiClient.ParticipantDTO>[] = [
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
            value: type.certificateTypeName as string,
            label: type.certificateTypeName as string,
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
                      if (row.participantId !== undefined)
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
