import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/CustomDateInput/CustomDateInput';
<<<<<<< HEAD

const AddCertificate: React.FC = () => {
=======
import { Certificate, Supplier } from '@/types/types';
import { useCertificates } from '../../hooks/useCertificates';
import SupplierSearchModal from '../../components/search-supplier-modal/SearchSupplierModal';
import { useLanguage } from '../../hooks/useLanguage';
import ParticipantLookupModal from '../../components/participant-lookup-modal/ParticipantLookupModal';
import { Participant } from '@/types/types';

type FormError = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  validRange: string;
};

const AddCertificate: React.FC = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { addCertificate, updateCertificate } = useCertificates();

  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);

  const handleOpenParticipantModal = () => {
    setIsParticipantModalOpen(true);
  };

  const handleCloseParticipantModal = () => {
    setIsParticipantModalOpen(false);
  };
  const handleSelectParticipant = (participant: Participant) => {
    setSelectedParticipants((prevParticipants) => [
      ...prevParticipants,
      participant,
    ]);
    console.log('Added participant:', participant);
  };

  const [certificateData, setCertificateData] = useState<Certificate>(() => {
    if (state?.editMode) {
      return state.certificateData;
    }
    return {
      supplier: '',
      certificateType: '',
      validFrom: null,
      validTo: null,
    };
  });

  const isEditMode = state?.editMode ?? false;
  const editIndex = state?.index;

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    validRange: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );

  const validateForm = (): boolean => {
    const newErrors: FormError = {
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      validRange: '',
    };

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

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSave = () => {
    if (validateForm()) {
      if (isEditMode && editIndex !== undefined) {
        updateCertificate(editIndex, certificateData);
      } else {
        addCertificate(certificateData);
      }

      setErrors({
        supplier: '',
        certificateType: '',
        validFrom: '',
        validTo: '',
        validRange: '',
      });

      navigate('/machine-learning/example1');
    }
  };

  const handleReset = () => {
    setCertificateData({
      id: -1,
      supplier: '',
      certificateType: '',
      validFrom: null,
      validTo: null,
      participants:[]
    });
    setPdfPreview(null);
    setSelectedSupplier(null);
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setCertificateData((prevData) => ({
      ...prevData,
      supplier: supplier.name,
    }));
    closeModal();
  };

  const handleClearSupplier = () => {
    setSelectedSupplier(null);
    setCertificateData((prevData) => ({
      ...prevData,
      supplier: '',
    }));
  };

>>>>>>> 337662f (task8-KAN-78 Implemented Add-participant feature)
  return (
    <div className="certificate-form-container">
      <div className="left-side">
        <div className="row">
          <label htmlFor="supplier">Supplier</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="supplier"
              className="supplier-input"
              readOnly={!!selectedSupplier}
            />
            <button
              className="search-button"
              onClick={openModal}
            >
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L19 19"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="clear-button"
              onClick={handleClearSupplier}
            >
              <svg
                viewBox="0 0 352 512"
                xmlns="http://www.w3.org/2000/svg"
                className="cancel-icon"
              >
                <path d="m242.72 256 100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0l-100.07 100.07-100.07-100.07c-12.28-12.28-32.19-12.28-44.48 0l-22.24 22.24c-12.28 12.28-12.28 32.19 0 44.48l100.07 100.07-100.07 100.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0l100.07-100.07 100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="row">
          <label htmlFor="certificate-type">Certificate type</label>
          <select
            id="certificate-type"
            name="certificateType"
            value={certificateData.certificateType}
            onChange={handleInput}
          >
            <option
              value=""
              disabled
            >
              Select your option
            </option>
            <option value="Permission of Printing">
              Permission of Printing
            </option>
            <option value="OHSAS 18001">OHSAS 18001</option>
          </select>
        </div>

        {/* <div className="row">
          <label htmlFor="start-date">Valid from</label>
          <input
            type="date"
            id="start-date"
            placeholder="Click to select date"
          />
        </div>

        <div className="row">
          <label htmlFor="end-date">Valid to</label>
          <input
            type="date"
            id="end-date"
            placeholder="Click to select date"
          />
        </div> */}

        <CustomDateInput
          id="start-date"
          label="Valid from"
        />
        <CustomDateInput
          id="end-date"
          label="Valid to"
        />
<<<<<<< HEAD
=======
        {errors.validTo && <p className="error-message">{errors.validTo}</p>}
        {errors.validRange && (
          <p className="error-message">{errors.validRange}</p>
        )}

        <div className="participants-container">
          <div>
            <label>{translations.assignedUsers}</label>
            <button
              className="add-participants-btn"
              onClick={handleOpenParticipantModal}
            >
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L19 19"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {translations.addParticipant}
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>{translations.name}</th>
                <th>{translations.department}</th>
                <th>{translations.email}</th>
              </tr>
            </thead>
            <tbody>
              {selectedParticipants.length > 0 ? (
                selectedParticipants.map((participant, index) => (
                  <tr key={participant.id || index}>
                    <td>
                      <svg
                        viewBox="0 0 352 512"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cross-icon"
                        onClick={() => {
                          setSelectedParticipants((prevParticipants) =>
                            prevParticipants.filter(
                              (p) => p.id !== participant.id,
                            ),
                          );
                        }}
                      >
                        <path d="m242.72 256 100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0l-100.07 100.07-100.07-100.07c-12.28-12.28-32.19-12.28-44.48 0l-22.24 22.24c-12.28 12.28-12.28 32.19 0 44.48l100.07 100.07-100.07 100.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0l100.07-100.07 100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48z" />
                      </svg>
                    </td>
                    <td>{participant.name}</td>
                    <td>{participant.department}</td>
                    <td>{participant.userId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="no-data-available"
                  >
                    {translations.noDataAvailable}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <ParticipantLookupModal
            isOpen={isParticipantModalOpen}
            onClose={handleCloseParticipantModal}
            onSelect={handleSelectParticipant}
          />
        </div>
>>>>>>> 337662f (task8-KAN-78 Implemented Add-participant feature)
      </div>
      <div className="right-side">
        <div>
          <button>Upload</button>
          <textarea
            name=""
            id=""
          ></textarea>
        </div>

        <div>
          <button onClick={handleSave}>{isEditMode ? 'Update' : 'Save'}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <SupplierSearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSupplierSelect}
      />
    </div>
  );
};

export default AddCertificate;
