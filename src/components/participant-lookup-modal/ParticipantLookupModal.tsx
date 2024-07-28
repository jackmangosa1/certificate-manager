import React, { useState, useEffect } from 'react';
import { useParticipants } from '../../hooks/useParticipants';
import { initializeDatabase } from '../../utils/indexed-db/indexedDb';
import './ParticipantLookup.css';
import { Participant } from '@/types/types';
import { useLanguage } from '../../hooks/useLanguage';

type ParticipantLookupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (participant: Participant) => void;
};

const ParticipantLookupModal: React.FC<ParticipantLookupModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { translations } = useLanguage();
  const { searchParticipants } = useParticipants();
  const [searchResults, setSearchResults] = useState<Participant[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    firstName: '',
    userId: '',
    department: '',
    plant: '',
  });
  const [initialResults, setInitialResults] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  useEffect(() => {
    if (isOpen) {
      const initializeAndFetch = async () => {
        await initializeDatabase();
        const results = await searchParticipants({});
        setInitialResults(results);
        setSearchResults(results);
      };
      initializeAndFetch();
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
  };

  const handleReset = () => {
    setSearchCriteria({
      name: '',
      firstName: '',
      userId: '',
      department: '',
      plant: '',
    });
    setSearchResults(initialResults);
  };

  const handleRadioChange = (Participant: Participant) => {
    setSelectedParticipant(Participant);
  };

  const handleSelect = () => {
    if (selectedParticipant) {
      onSelect(selectedParticipant);
      onClose();
    }
  };

  const handleCloseModal = () => {
    handleReset();
    setSelectedParticipant(null);
    onClose();
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
              <span className="dropdown-arrow">▼</span>
              {translations.personList}
            </div>
            <div className="participant-list">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>{translations.name}</th>
                    <th>{translations.firstName}</th>
                    <th>{translations.userId}</th>
                    <th>{translations.department}</th>
                    <th>{translations.plant}</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((Participant) => (
                    <tr key={Participant.id}>
                      <td>
                        <td>
                          <input
                            type="checkbox"
                            name="selectedParticipant"
                            value={Participant.id}
                            checked={selectedParticipant?.id === Participant.id}
                            onChange={() => handleRadioChange(Participant)}
                          />
                        </td>
                      </td>
                      <td>{Participant.name}</td>
                      <td>{Participant.firstName}</td>
                      <td>{Participant.userId}</td>
                      <td>{Participant.department}</td>
                      <td>{Participant.plant}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="select-button"
              onClick={handleSelect}
              disabled={!selectedParticipant}
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
