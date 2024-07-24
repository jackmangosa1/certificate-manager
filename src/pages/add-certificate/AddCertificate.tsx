import './AddCertificate.css';
import CustomDateInput from '../../components/custom-date-input/CustomDateInput';
import { useState } from 'react';
import { Certificate } from '@/types/types';
import { certificates } from '../example-1/Example1';
import { useNavigate } from 'react-router-dom';
import SupplierLookup from '../../components/supplier-lookup/SupplierLookup';
import PdfViewer from '../../components/pdf-viewer/PdfViewer';

type FormError = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  validRange: string;
};

const initialErrorData: FormError = {
  supplier: '',
  certificateType: '',
  validFrom: '',
  validTo: '',
  validRange: '',
};

const initialCertificateData: Certificate = {
  supplier: '',
  certificateType: '',
  validFrom: null,
  validTo: null,
};

const AddCertificate: React.FC = () => {
  const navigate = useNavigate();

  const [certificateData, setCertificateData] = useState<Certificate>(
    initialCertificateData,
  );

  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>(initialErrorData);

  const validateForm = (): boolean => {
    const newErrors: FormError = { ...initialErrorData };

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

    const isValid = Object.values(newErrors).every((error) => error === '');

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
    if (validateForm()) {
      certificates.push(certificateData);

      setErrors(initialErrorData);

      navigate('/machine-learning/example1');
    }
  };

  const handleReset = () => {
    setCertificateData(initialCertificateData);
    setPdfPreview(null);
    setErrors(initialErrorData);
  };

  return (
    <div className="certificate-form-container">
      <div className="left-side">
        <SupplierLookup
          value={certificateData.supplier}
          onChange={handleInput}
          error={errors.supplier}
        />

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
        <PdfViewer
          pdfPreview={pdfPreview}
          setPdfPreview={setPdfPreview}
        />

        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
