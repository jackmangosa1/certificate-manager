import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/custom-date-input/CustomDateInput';
import CustomSelect from '../../components/custom-select/CustomSelect';
import SupplierSearchModal from '../../components/search-supplier-modal/SearchSupplierModal';
import SupplierLookup from '../../components/supplier-lookup/SupplierLookup';
import PdfViewer from '../../components/pdf-viewer/PdfViewer';
import { Certificate, CertificateType } from '../../types/types';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import { getCertificateById } from '../../db/indexedDb';
import { Supplier } from '../../types/types';

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
};

const certificateOptions = Object.values(CertificateType).map((value) => ({
  value,
  label: value,
}));

const AddCertificate: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addCertificate, updateCertificate } = useCertificates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [certificateData, setCertificateData] = useState<
    Omit<Certificate, 'id'>
  >(initialCertificateData);
  const [editMode, setEditMode] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormError>(initialErrorData);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (id) {
        const fetchedCertificate = await getCertificateById(parseInt(id));
        if (fetchedCertificate) {
          setCertificateData(fetchedCertificate);
          setEditMode(true);
          setPdfPreview(fetchedCertificate.pdfData);
        }
      }
    };
    fetchCertificate();
  }, [id]);

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
    if (!certificateData.pdfData) {
      newErrors.pdfData = 'PDF file is required.';
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
        if (editMode && id) {
          await updateCertificate(parseInt(id), certificateData);
        } else {
          await addCertificate(certificateData);
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
    setPdfPreview(null);
  };

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
          onPdfChange={handlePdfChange}
          error={errors.pdfData}
        />

        <div className="button-container">
          <button
            onClick={handleSave}
            className="save-button"
          >
            {editMode ? 'Update' : 'Save'}
          </button>
          <button
            onClick={handleReset}
            className="reset-button"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
