import './AddCertificate.css';
import CustomDateInput from '../../components/CustomDateInput/CustomDateInput';
import { useState } from 'react';
import { Certificate } from '@/types/types';
import { certificates } from '../example-1/Example1';
import { useNavigate, useLocation } from 'react-router-dom';

type FormError = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  validRange: string;
};

const AddCertificate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [certificateData, setCertificateData] = useState<Certificate>(() => {
    if (state && state.editMode) {
      return state.certificateData;
    }
    return {
      supplier: '',
      certificateType: '',
      validFrom: null,
      validTo: null,
    };
  });

  const [isEditMode] = useState<boolean>(state && state.editMode);

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    validRange: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormError = {
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      validRange: '',
    };

    if (!certificateData.supplier) newErrors.supplier = 'Supplier is required.';
    if (!certificateData.certificateType)
      newErrors.certificateType = 'Certificate type is required.';
    if (!certificateData.validFrom)
      newErrors.validFrom = 'Valid from date is required.';
    if (!certificateData.validTo)
      newErrors.validTo = 'Valid to date is required.';
    if (
      certificateData.validFrom &&
      certificateData.validTo &&
      certificateData.validFrom > certificateData.validTo
    ) {
      newErrors.validRange =
        'Valid from date cannot be after the valid to date.';
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
      if (isEditMode) {
        // Find and update the existing certificate
        const index = certificates.findIndex(
          (cert) =>
            cert.supplier === state.certificateData.supplier &&
            cert.certificateType === state.certificateData.certificateType,
        );
        if (index !== -1) {
          certificates[index] = certificateData;
        }
      } else {
        // Add new certificate
        certificates.push(certificateData);
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
      supplier: '',
      certificateType: '',
      validFrom: null,
      validTo: null,
    });
    setPdfPreview(null);
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
            />
            <button className="search-button">
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

            <button className="clear-button">
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
    </div>
  );
};

export default AddCertificate;
