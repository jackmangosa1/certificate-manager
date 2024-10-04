import React, { useState } from 'react';
import { useParticipants } from '../../hooks/useParticipants';
import './ParticipantLookup.css';
import { useLanguage } from '../../hooks/useLanguage';
import Table, { ColumnConfig } from '../table/Table';
import { ApiClient } from '../../api/apiClient';

type ParticipantLookupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (participants: ApiClient.ParticipantDTO[]) => void;
  certificateId: number;
};

const initialSearchCriteria = {
  name: '',
  firstName: '',
  userId: undefined,
  department: '',
  plant: '',
};

const ParticipantLookupModal: React.FC<ParticipantLookupModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  certificateId,
}) => {
  const { translations } = useLanguage();
  const { addParticipant, searchParticipants } = useParticipants();
  const [searchResults, setSearchResults] = useState<
    ApiClient.ParticipantDTO[]
  >([]);
  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
  const [selectedParticipants, setSelectedParticipants] = useState<
    ApiClient.ParticipantDTO[]
  >([]);
  const [selectAll, setSelectAll] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const { name, firstName, userId, department, plant } = searchCriteria;
    const results = await searchParticipants(
      userId,
      name,
      firstName,
      department,
      plant,
    );
    setSearchResults(results);
    setSelectAll(false);
    setSelectedParticipants([]);
  };

  const handleReset = () => {
    setSearchCriteria(initialSearchCriteria);
    setSearchResults([]);
    setSelectedParticipants([]);
    setSelectAll(false);
  };

  const handleCheckboxChange = (participant: ApiClient.ParticipantDTO) => {
    setSelectedParticipants((prev) => {
      if (prev.some((p) => p.participantId === participant.participantId)) {
        const newSelected = prev.filter(
          (p) => p.participantId !== participant.participantId,
        );
        setSelectAll(false);
        return newSelected;
      } else {
        const newSelected = [...prev, participant];
        setSelectAll(newSelected.length === searchResults.length);
        return newSelected;
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedParticipants(searchResults);
    } else {
      setSelectedParticipants([]);
    }
  };

  const handleSelect = async () => {
    if (selectedParticipants.length > 0) {
      try {
        const participantDTOs = selectedParticipants.map((participant) => ({
          ...participant,
        })) as ApiClient.ParticipantDTO[];

        await addParticipant(certificateId, participantDTOs);
        onSelect(selectedParticipants);
        handleCloseModal();
      } catch (error) {
        console.error('Error adding participants:', error);
      }
    }
  };

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

  const columns: ColumnConfig<ApiClient.ParticipantDTO>[] = [
    { header: translations.name, accessor: (participant) => participant.name },
    {
      header: translations.firstName,
      accessor: (participant) => participant.firstName,
    },
    {
      header: translations.department,
      accessor: (participant) => participant.department,
    },
    {
      header: translations.plant,
      accessor: (participant) => participant.plant,
    },
  ];

  const actionColumn = {
    header: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="select-all"
        />
      </div>
    ),
    render: (participant: ApiClient.ParticipantDTO) => (
      <input
        type="checkbox"
        checked={
          selectAll ||
          selectedParticipants.some(
            (p) => p.participantId === participant.participantId,
          )
        }
        onChange={(e) => {
          e.stopPropagation();
          handleCheckboxChange(participant);
        }}
      />
    ),
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{translations.searchForPerson}</h2>
          <button
            className="close-button"
            onClick={handleCloseModal}
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="search-criteria-container">
            <div className="search-criteria-header">
              <span className="dropdown-arrow">▼</span>{' '}
              {translations.searchCriteria}
            </div>
            <div className="search-criteria">
              <div className="search-fields">
                <div className="search-field">
                  <label>{translations.name}</label>
                  <input
                    type="text"
                    name="name"
                    value={searchCriteria.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>{translations.firstName}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={searchCriteria.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>{translations.userId}</label>
                  <input
                    type="text"
                    name="userId"
                    value={searchCriteria.userId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>{translations.department}</label>
                  <input
                    type="text"
                    name="department"
                    value={searchCriteria.department}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="search-field">
                  <label>{translations.plant}</label>
                  <input
                    type="text"
                    name="plant"
                    value={searchCriteria.plant}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="search-buttons">
                <button
                  className="participant-search-button"
                  onClick={handleSearch}
                >
                  {translations.search}
                </button>
                <button
                  className="reset-button"
                  onClick={handleReset}
                >
                  {translations.reset}
                </button>
              </div>
            </div>
          </div>

          <div className="participant-list-container">
            <div className="participant-list-header">
              <span className="dropdown-arrow">▼</span>{' '}
              {translations.personList}
            </div>
            <div className="participant-list">
              <Table
                columns={columns}
                data={searchResults}
                actionColumn={actionColumn}
                onRowClick={(participant) => handleCheckboxChange(participant)}
                selectedRows={selectedParticipants}
                onSelectRow={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className={`select-button ${selectedParticipants.length === 0 ? 'disabled' : ''}`}
              onClick={handleSelect}
              disabled={selectedParticipants.length === 0}
            >
              {translations.select}
            </button>
            <button
              className="cancel-button"
              onClick={handleCloseModal}
            >
              {translations.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantLookupModal;
