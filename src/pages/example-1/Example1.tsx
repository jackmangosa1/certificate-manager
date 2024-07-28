import { useState } from 'react';
import './Example1.css';
import Table, { ColumnConfig } from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';
import ActionMenu from '../../components/action-menu/ActionMenu';
import GearIcon from '../../icons/GearIcon';
import ConfirmationModal from '../../components/confirmation-modal/ConfirmationModal';
import { Certificate } from '../../types/types';
import { useLanguage } from '../../hooks/useLanguage';
import ParticipantLookupModal from '../../components/participant-lookup-modal/ParticipantLookupModal';
import { Participant } from '@/types/types';

const Example1: React.FC = () => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const { certificates, deleteCertificate } = useCertificates();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);

  const columns: ColumnConfig<Certificate>[] = [
    {
      header: translations.supplier,
      accessor: (row) => row.supplier,
    },
    {
      header: translations.certificateType,
      accessor: (row) => row.certificateType,
    },
    {
      header: translations.validFrom,
      accessor: (row) => new Date(row.validFrom as Date).toLocaleDateString(),
    },
    {
      header: translations.validTo,
      accessor: (row) => new Date(row.validTo as Date).toLocaleDateString(),
    },
  ];

  const handleEdit = (index: number) => {
    const certificateToEdit = certificates[index];
    navigate(`${AppRoutes.AddCertificate}/${certificateToEdit.id}`);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
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
    header: '',
    render: (_row: Certificate, index: number) => (
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
    </div>
  );
};

export default Example1;
