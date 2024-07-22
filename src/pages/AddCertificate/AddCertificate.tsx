import './AddCertificate.css';
import CustomDateInput from '../../components/CustomDateInput/CustomDateInput';
import { useState } from 'react';
import { Certificate } from '@/types/types';
import { certificates } from '../example-1/Example1';
import { useNavigate } from 'react-router-dom';

type FormError = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  validRange: string;
};

type NewFormError = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  validRange: string;
};

const AddCertificate: React.FC = () => {
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState<Certificate>({
    supplier: '',
    certificateType: '',
    validFrom: null,
    validTo: null,
  });

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>({
    supplier: '',
    certificateType: '',
    validFrom: '',
    validTo: '',
    validRange: '',
  });

  const validateForm = (): boolean => {
    const newErrors: NewFormError = {
      supplier: '',
      certificateType: '',
      validFrom: '',
      validTo: '',
      validRange: '',
    };

    console.log('Validating form data:', certificateData);

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

    console.log('Validation errors:', newErrors);

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === '');
    console.log('Form is valid:', isValid);

    return isValid;
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
    console.log('Attempting to save...');
    if (validateForm()) {
      console.log('Form validated successfully');
      setCertificateData(certificateData);
      certificates.push(certificateData);
      console.log('Certificate added:', certificateData);
      console.log('Updated certificates array:', certificates);

      setErrors({
        supplier: '',
        certificateType: '',
        validFrom: '',
        validTo: '',
        validRange: '',
      });

      navigate('/machine-learning/example1');
    } else {
      console.log('Form validation failed');
      console.log('Current errors:', errors);
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
              name="supplier"
              value={certificateData.supplier}
              onChange={handleInput}
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
        {errors.supplier && <p className="error-message">{errors.supplier}</p>}

        <div className="row">
          <label htmlFor="certificate-type">Certificate type</label>
          <select
            id="certificate-type"
            name="certificateType"
            value={certificateData.certificateType}
            onChange={handleInput}
            defaultValue=""
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
        {errors.certificateType && (
          <p className="error-message">{errors.certificateType}</p>
        )}

        <CustomDateInput
          id="start-date"
          label="Valid from"
          name="validFrom"
          value={certificateData.validFrom}
          onChange={(date) => handleDateChange('validFrom', date)}
        />
        {errors.validFrom && (
          <p className="error-message">{errors.validFrom}</p>
        )}

        <CustomDateInput
          id="end-date"
          label="Valid to"
          name="validTo"
          value={certificateData.validTo}
          onChange={(date) => handleDateChange('validTo', date)}
        />
        {errors.validTo && <p className="error-message">{errors.validTo}</p>}
        {errors.validRange && (
          <p className="error-message">{errors.validRange}</p>
        )}
      </div>
      <div className="right-side">
        <div>
          <label className="upload-button">
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              hidden
            />
            Upload
          </label>
          <div className="pdf-preview">
            <iframe
              src={pdfPreview || 'about:blank'}
              width="100%"
              height="100%"
              title="PDF Preview"
              className="preview-area"
            ></iframe>
          </div>
        </div>

        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
