import './Navbar.css';
import { Link } from 'react-router-dom';
import CustomSelect from '../custom-select/CustomSelect';
import { useLanguage } from '../../hooks/useLanguage';
import { useParticipants } from '../../hooks/useParticipants';
import { Language } from '../../types/types';
import { useState, useEffect } from 'react';
import MenuIcon from '../../icons/Menu';

type NavBarProps = {
  className: string;
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavBarProps> = ({ className, toggleSidebar }) => {
  const { language, setLanguage, translations } = useLanguage();
  const { participants, initializeAndFetchParticipants } = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useState<string>('');

  useEffect(() => {
    const fetchParticipants = async () => {
      await initializeAndFetchParticipants();
    };
    fetchParticipants();
  }, [initializeAndFetchParticipants]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleParticipantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParticipant(e.target.value);
  };

  const languageOptions = [
    { value: Language.ENGLISH, label: 'English' },
    { value: Language.GERMAN, label: 'Deutsch' },
  ];

  const participantOptions = participants.map((participant) => ({
    value: String(participant.id),
    label: `${participant.firstName} ${participant.name}`,
  }));

  useEffect(() => {
    if (participants.length > 0 && !selectedParticipant) {
      setSelectedParticipant(String(participants[0].id));
    }
  }, [participants, selectedParticipant]);

  return (
    <div className={`navbar ${className}`}>
      <div className="left">
        <div onClick={toggleSidebar}>
          <MenuIcon className="menu-icon-header" />
        </div>

        <Link to="/">
          <h1>{translations.title}</h1>
        </Link>
      </div>
      <div className="right">
        <CustomSelect
          id="language-type"
          label={translations.language}
          name="languageType"
          value={language}
          onChange={handleLanguageChange}
          options={languageOptions}
          className="language-select"
        />
        <CustomSelect
          id="participant"
          label={translations.user}
          name="participant"
          value={selectedParticipant}
          onChange={handleParticipantChange}
          options={participantOptions}
          className="user-select"
        />
      </div>
    </div>
  );
};

export default Navbar;
