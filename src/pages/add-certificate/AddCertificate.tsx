import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/custom-date-input/CustomDateInput';
import CustomSelect from '../../components/custom-select/CustomSelect';
import { certificates } from '../example-1/certificateMockData';
import SupplierLookup from '../../components/supplier-lookup/SupplierLookup';
import PdfViewer from '../../components/pdf-viewer/PdfViewer';
import { CertificateType } from '../../types/types';

type Certificate = {
  supplier: string;
  certificateType: CertificateType | '';
  validFrom: Date | null;
  validTo: Date | null;
};

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

const certificateOptions = Object.values(CertificateType).map((value) => ({
  value,
  label: value,
}));

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

        <CustomSelect
          id="certificate-type"
          label="Certificate type"
          name="certificateType"
          value={certificateData.certificateType}
          onChange={handleInput}
          options={certificateOptions}
          error={errors.certificateType}
        />

        <CustomDateInput
          id="start-date"
          label="Valid from"
          name="validFrom"
          value={certificateData.validFrom}
          onChange={(date) => handleDateChange('validFrom', date)}
          error={errors.validFrom}
        />

        <CustomDateInput
          id="end-date"
          label="Valid to"
          name="validTo"
          value={certificateData.validTo}
          onChange={(date) => handleDateChange('validTo', date)}
          error={errors.validTo}
        />

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
