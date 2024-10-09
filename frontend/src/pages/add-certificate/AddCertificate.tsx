import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/custom-date-input/CustomDateInput';
import CustomSelect from '../../components/custom-select/CustomSelect';
import SupplierSearchModal from '../../components/search-supplier-modal/SearchSupplierModal';
import SupplierLookup from '../../components/supplier-lookup/SupplierLookup';
import PdfViewer from '../../components/pdf-viewer/PdfViewer';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import { useLanguage } from '../../hooks/useLanguage';
import { useCertificateTypes } from '../../hooks/useCertificateTypes';
import ParticipantLookupModal from '../../components/participant-lookup-modal/ParticipantLookupModal';
import Table, { ColumnConfig } from '../../components/table/Table';
import SearchIcon from '../../icons/SearchIcon';
import CrossIcon from '../../icons/CrossIcon';
import CommentSection from '../../components/comment-section/CommentSection';
import { useUser } from '../../context/UserContext';
import { isBase64 } from '../../utils/convertPDF';
import { ApiClient } from '../../api/apiClient';
import Notification from '../../components/notification/Notification';

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
initialCertificateData.supplier = undefined;
initialCertificateData.validTo = undefined;
initialCertificateData.validFrom = undefined;
initialCertificateData.pdfDocumentData = '';
initialCertificateData.comments = [];
initialCertificateData.participants = [];

const AddCertificate: React.FC = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
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
  const [selectedSupplier, setSelectedSupplier] = useState<
    ApiClient.SupplierDTO | undefined
  >(undefined);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSupplierSelect = (supplier: ApiClient.SupplierDTO) => {
    setSelectedSupplier(supplier);
    setCertificateData(
      (prev) =>
        new ApiClient.GetCertificateDTO({
          ...prev,
          supplier: supplier,
        }),
    );
    closeModal();
  };

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        try {
          const fetchedCertificate = await getCertificateById(parseInt(id));
          if (fetchedCertificate) {
            const newCertificate = new ApiClient.GetCertificateDTO(
              fetchedCertificate,
            );
            setCertificateData(newCertificate);
            setSelectedParticipants(newCertificate.participants || []);
            setComments(newCertificate.comments || []);
            setSelectedSupplier(newCertificate.supplier);
            setEditMode(true);

            if (newCertificate.pdfDocumentData) {
              const isPDFBase64 = isBase64(newCertificate.pdfDocumentData);
              const base64Data = isPDFBase64
                ? newCertificate.pdfDocumentData
                : btoa(newCertificate.pdfDocumentData);
              setPdfBase64(`data:application/pdf;base64,${base64Data}`);
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
    setCertificateData(
      (prev) =>
        new ApiClient.GetCertificateDTO({
          ...prev,
          [name]: value,
        }),
    );
  };

  const handleDateChange = (
    name: 'validFrom' | 'validTo',
    date: Date | null,
  ) => {
    setCertificateData(
      (prev) =>
        new ApiClient.GetCertificateDTO({
          ...prev,
          [name]: date ? date.toISOString() : undefined,
        }),
    );
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
    if (
      certificateData.validFrom &&
      certificateData.validTo &&
      new Date(certificateData.validFrom) == new Date(certificateData.validTo)
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
  const commentsToAdd = comments.map(
    (comment) =>
      new ApiClient.CommentDTO({
        commentText: comment.commentText,
        userId: selectedUser?.userId,
        username: selectedUser?.username,
      }),
  );

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const certificateType = certificateTypes.find(
        (type) =>
          type.certificateTypeName === certificateData.certificateTypeName,
      );

      if (
        !certificateType?.certificateTypeId ||
        !selectedSupplier?.supplierId
      ) {
        throw new Error('Invalid certificate type or supplier');
      }

      const processedPdfData = pdfBase64?.includes(',')
        ? pdfBase64.split(',')[1]
        : pdfBase64 || '';

      if (editMode && id) {
        const newComments = comments.filter((comment) => {
          return !certificateData.comments?.some(
            (initialComment) => initialComment.commentId === comment.commentId,
          );
        });

        const updateDto = new ApiClient.CertificateDTO({
          supplierId: selectedSupplier.supplierId,
          certificateTypeId: certificateType.certificateTypeId,
          validFrom: new Date(certificateData.validFrom!),
          validTo: new Date(certificateData.validTo!),
          pdfDocumentData: processedPdfData,
          participantIds: selectedParticipants
            .filter((p) => p.participantId !== undefined)
            .map((p) => p.participantId!),
          commentsToAdd: newComments.map(
            (comment) =>
              new ApiClient.CommentDTO({
                commentText: comment.commentText,
                userId: selectedUser?.userId,
                username: selectedUser?.username,
              }),
          ),
        });

        await updateCertificate(parseInt(id), updateDto);
        setNotification({
          message: '✅ Certificate updated successfully!',
          type: 'success',
        });
        setTimeout(() => {
          navigate(AppRoutes.Example1);
        }, 1000);
      } else {
        const createDto = new ApiClient.CertificateDTO({
          certificateId: 0,
          supplierId: selectedSupplier.supplierId,
          certificateTypeId: certificateType.certificateTypeId,
          validFrom: new Date(certificateData.validFrom!),
          validTo: new Date(certificateData.validTo!),
          pdfDocumentData: processedPdfData,
          participantIds: selectedParticipants
            .filter((p) => p.participantId !== undefined)
            .map((p) => p.participantId!),
          commentsToAdd: commentsToAdd,
        });

        await addCertificate(createDto);
      }

      setNotification({
        message: '✅ Certificate Created successfully!',
        type: 'success',
      });
      setTimeout(() => {
        navigate(AppRoutes.Example1);
      }, 1000);
    } catch (error) {
      console.error('Error saving certificate:', error);
      setErrors((prev) => ({
        ...prev,
        general:
          error instanceof Error ? error.message : 'Failed to save certificate',
      }));
    }
  };

  const handleClearSupplier = () => {
    setCertificateData((prevData) => {
      const updatedData = {
        ...prevData,
        supplier: undefined,
      } as ApiClient.GetCertificateDTO;

      return updatedData;
    });

    setSelectedSupplier(undefined);
  };

  const handleReset = () => {
    setCertificateData(initialCertificateData);
    setSelectedParticipants([]);
    setPdfBase64(null);
    setSelectedSupplier(undefined);
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

  const handleRemoveParticipant = (participantId: number) => {
    setSelectedParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.participantId !== participantId),
    );
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
  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="certificate-form-container">
      <div className="left-side">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleCloseNotification}
          />
        )}
        <SupplierLookup
          value={selectedSupplier?.name || ''}
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
                        handleRemoveParticipant(row.participantId);
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
