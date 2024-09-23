import React, { useState, useEffect } from 'react';
import { useParticipants } from '../../hooks/useParticipants';
import { initializeDatabase } from '../../db/indexedDb';
import './ParticipantLookup.css';
import { Participant } from '../../types/types';
import { useLanguage } from '../../hooks/useLanguage';
import Table, { ColumnConfig } from '../table/Table';

type ParticipantLookupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (participants: Participant[]) => void;
};

const initialSearchCriteria = {
  name: '',
  firstName: '',
  userId: '',
  department: '',
  plant: '',
};

const ParticipantLookupModal: React.FC<ParticipantLookupModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { translations } = useLanguage();
  const { searchParticipants } = useParticipants();
  const [searchResults, setSearchResults] = useState<Participant[]>([]);
  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      initializeDatabase();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const results = await searchParticipants(searchCriteria);
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

  const handleCheckboxChange = (participant: Participant) => {
    setSelectedParticipants((prev) => {
      if (prev.some((p) => p.id === participant.id)) {
        const newSelected = prev.filter((p) => p.id !== participant.id);
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

  const handleSelect = () => {
    if (selectedParticipants.length > 0) {
      onSelect(selectedParticipants);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    handleReset();
    onClose();
  };

  const columns: ColumnConfig<Participant>[] = [
    { header: translations.name, accessor: (participant) => participant.name },
    {
      header: translations.firstName,
      accessor: (participant) => participant.firstName,
    },
    {
      header: translations.userId,
      accessor: (participant) => participant.userId,
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
    render: (participant: Participant) => (
      <input
        type="checkbox"
        checked={
          selectAll || selectedParticipants.some((p) => p.id === participant.id)
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
