import { useState } from 'react';
import './Example1.css';
import Table from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import ActionMenu from '../../components/action-menu/ActionMenu';
import GearIcon from '../../icons/GearIcon';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import { Certificate } from '../../types/types';
import { ColumnConfig } from '../../components/table/Table';
import { useLanguage } from '../../hooks/useLanguage';

const Example1: React.FC = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const { certificates, deleteCertificate } = useCertificates();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const columns: ColumnConfig<Certificate>[] = [
    {
      header: translations.supplier,
      accessor: (row: Certificate) => row.supplier,
    },
    {
      header: translations.certificateType,
      accessor: (row: Certificate) => row.certificateType,
    },
    {
      header: translations.validFrom,
      accessor: (row: Certificate) =>
        new Date(row.validFrom as Date).toLocaleDateString(),
    },
    {
      header: translations.validTo,
      accessor: (row: Certificate) =>
        new Date(row.validTo as Date).toLocaleDateString(),
    },
  ];

  const handleEdit = (index: number) => {
    const certificateToEdit = certificates[index];
    navigate(`${AppRoutes.AddCertificate}/${certificateToEdit.id}`);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const certificateToDelete = certificates[deleteIndex];
      if (certificateToDelete.id !== undefined) {
        deleteCertificate(certificateToDelete.id);
      }
    }
    setIsModalOpen(false);
  };

  const actionColumn = {
    render: (_row: any, index: number) => (
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
        message="Are you sure you want to delete this certificate?"
      />
    </div>
  );
};

export default Example1;
