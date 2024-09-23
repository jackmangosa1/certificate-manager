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
  Supplier,
  Participant,
  Comment,
} from '../../types/types';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import { getCertificateById } from '../../db/indexedDb';
import { useLanguage } from '../../hooks/useLanguage';
import ParticipantLookupModal from '../../components/participant-lookup-modal/ParticipantLookupModal';
import Table, { ColumnConfig } from '../../components/table/Table';
import SearchIcon from '../../icons/SearchIcon';
import CrossIcon from '../../icons/CrossIcon';
import { useParticipants } from '../../hooks/useParticipants';
import CommentSection from '../../components/comment-section/CommentSection';
import { useUser } from '../../context/UserContext';

type FormError = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  validRange: string;
  pdfData: string;
};

const initialErrorData: FormError = {
  supplier: '',
  certificateType: '',
  validFrom: '',
  validTo: '',
  validRange: '',
  pdfData: '',
};

const initialCertificateData: Omit<Certificate, 'id'> = {
  supplier: '',
  certificateType: '',
  validFrom: null,
  validTo: null,
  pdfData: null,
  participants: [],
  comments: [],
};

const AddCertificate: React.FC = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addCertificate, updateCertificate } = useCertificates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);
  const { selectedUser } = useUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [certificateData, setCertificateData] = useState<
    Omit<Certificate, 'id'>
  >(initialCertificateData);
  const [editMode, setEditMode] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>(initialErrorData);
  const { deleteParticipant } = useParticipants();
  const [comments, setComments] = useState<Comment[] | undefined>([]);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        const fetchedCertificate = await getCertificateById(parseInt(id));
        if (fetchedCertificate) {
          setCertificateData(fetchedCertificate);
          setSelectedParticipants(fetchedCertificate.participants || []);
          setComments(fetchedCertificate.comments);
          setEditMode(true);
          setPdfPreview(fetchedCertificate.pdfData);
        }
      }
    };
    fetchCertificate();
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: FormError = { ...initialErrorData };

    if (!certificateData.supplier)
      newErrors.supplier = translations.errors.required.supplier;
    if (!certificateData.certificateType)
      newErrors.certificateType = translations.errors.required.certificateType;
    if (!certificateData.validFrom)
      newErrors.validFrom = translations.errors.required.validFrom;
    if (!certificateData.validTo)
      newErrors.validTo = translations.errors.required.validTo;
    if (
      certificateData.validFrom &&
      certificateData.validTo &&
      certificateData.validFrom > certificateData.validTo
    ) {
      newErrors.validRange = translations.errors.validRange;
    }
    if (!certificateData.pdfData) {
      newErrors.pdfData = translations.errors.required.pdfData;
    }
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: name === 'certificateType' ? (value as CertificateType) : value,
    }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSave = async () => {
    if (validateForm()) {
      try {
        const certificateToSave = {
          ...certificateData,
          participants: selectedParticipants,
          comments: comments,
        };

        if (editMode && id) {
          await updateCertificate(parseInt(id), certificateToSave);
        } else {
          await addCertificate(certificateToSave);
        }
        setErrors(initialErrorData);
        navigate(AppRoutes.Example1);
      } catch (error) {
        console.error('Error saving certificate:', error);
      }
    }
  };

  const handlePdfChange = (pdfData: string | null) => {
    setCertificateData((prevData) => ({
      ...prevData,
      pdfData,
    }));
  };

  const handleSupplierSelect = (supplier: Supplier) => {
    setCertificateData((prevData) => ({
      ...prevData,
      supplier: supplier.name,
    }));
    closeModal();
  };

  const handleClearSupplier = () => {
    setCertificateData((prevData) => ({
      ...prevData,
      supplier: '',
    }));
  };

  const handleReset = () => {
    setCertificateData(initialCertificateData);
    setSelectedParticipants([]);
    setComments([]);
    setPdfPreview(null);
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

  const handleRemoveParticipant = async (participantId: number) => {
    try {
      await deleteParticipant(participantId);
      setSelectedParticipants((prevParticipants) =>
        prevParticipants.filter(
          (participant) => participant.id !== participantId,
        ),
      );
    } catch (error) {
      console.error('Failed to delete participant:', error);
    }
  };

  const handleCommentsChange = (newComments: Comment[] | undefined) => {
    setComments(newComments);
  };

  const participantColumns: ColumnConfig<Participant>[] = [
    {
      header: translations.name,
      accessor: (row) => row.name,
    },
    {
      header: translations.department,
      accessor: (row) => row.department,
    },
    {
      header: translations.email,
      accessor: (row) => row.userId,
    },
  ];

  return (
    <div className="certificate-form-container">
      <div className="left-side">
        <SupplierLookup
          value={certificateData.supplier}
          onChange={handleInput}
          error={errors.supplier}
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
          name="certificateType"
          value={certificateData.certificateType}
          onChange={handleInput}
          options={Object.values(CertificateType).map((value) => ({
            value,
            label: value,
          }))}
          error={errors.certificateType}
          className="certificate-select"
        />

        <CustomDateInput
          id="start-date"
          label={translations.validFrom}
          name="validFrom"
          value={certificateData.validFrom}
          onChange={(date) => handleDateChange('validFrom', date)}
          error={errors.validFrom}
        />

        <CustomDateInput
          id="end-date"
          label={translations.validTo}
          name="validTo"
          value={certificateData.validTo}
          onChange={(date) => handleDateChange('validTo', date)}
          error={errors.validTo}
        />

        {errors.validRange && (
          <p className="error-message">{errors.validRange}</p>
        )}

        {selectedUser ? (
          <CommentSection
            currentUserId={selectedUser.id}
            currentUserName={selectedUser.firstName}
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
                  <div onClick={() => handleRemoveParticipant(row.id)}>
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
          />
        </div>
      </div>
      <div className="right-side">
        <PdfViewer
          pdfPreview={pdfPreview}
          setPdfPreview={setPdfPreview}
          onPdfChange={handlePdfChange}
          error={errors.pdfData}
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
