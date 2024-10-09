import { useState } from 'react';
import './Example1.css';
import Table, { ColumnConfig } from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import ActionMenu from '../../components/action-menu/ActionMenu';
import GearIcon from '../../icons/GearIcon';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import { useLanguage } from '../../hooks/useLanguage';
import { ApiClient } from '../../api/apiClient';
import { formatDate } from '../../utils/convertDate';

const Example1: React.FC = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const { certificates, deleteCertificate } = useCertificates();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  const columns: ColumnConfig<ApiClient.CertificateSummaryDTO>[] = [
    {
      header: translations.supplier,
      accessor: (row) => row.supplierDetails,
    },
    {
      header: translations.certificateType,
      accessor: (row) => row.certificateTypeName,
    },
    {
      header: translations.validFrom,
      accessor: (row) => formatDate(row.validFrom!),
    },
    {
      header: translations.validTo,
      accessor: (row) => formatDate(row.validTo!),
    },
  ];

  const handleEdit = (index: number) => {
    const certificateToEdit = certificates[index];
    navigate(`${AppRoutes.AddCertificate}/${certificateToEdit.certificateId}`);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const certificateToDelete = certificates[deleteIndex];
      if (certificateToDelete.certificateId !== undefined) {
        deleteCertificate(certificateToDelete.certificateId);
      }
    }
    setIsModalOpen(false);
  };

  const actionColumn = {
    header: '',
    render: (_row: ApiClient.CertificateSummaryDTO, index: number) => (
      <div className="menu-wrapper">
        <div onClick={() => setActiveMenu(activeMenu === index ? null : index)}>
          <GearIcon className="gear-icon" />
        </div>
        {activeMenu === index && (
          <ActionMenu
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        )}
      </div>
    ),
  };

  return (
    <div className="content">
      <h1 className="title">{translations.example1}</h1>
      <button
        className="add-certificate-btn"
        onClick={() => navigate(AppRoutes.AddCertificate)}
      >
        {translations.newCertificate}
      </button>
      <Table
        columns={columns}
        data={certificates}
        actionColumn={actionColumn}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={translations.deleteConfirmation}
      />
    </div>
  );
};

export default Example1;
