import './Navbar.css';
import { Link } from 'react-router-dom';
import CustomSelect from '../custom-select/CustomSelect';
import { useLanguage } from '../../hooks/useLanguage';
<<<<<<< HEAD:src/components/navbar/Navbar.tsx
import { useParticipants } from '../../hooks/useParticipants';
import { Language } from '../../types/types';
import { useState, useEffect } from 'react';
import MenuIcon from '../../icons/Menu';
=======
import { useUsers } from '../../hooks/useUsers';
import { Language } from '../../types/types';
import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
>>>>>>> 7102dcd (task10-KAN-81 Implement user-comments:):src/components/Navbar/Navbar.tsx

type NavBarProps = {
  className?: string;
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavBarProps> = ({ className, toggleSidebar }) => {
  const { selectedUser, setSelectedUser } = useUser();
  const { language, setLanguage, translations } = useLanguage();
<<<<<<< HEAD:src/components/navbar/Navbar.tsx
  const { participants, initializeAndFetchParticipants } = useParticipants();
  const [selectedParticipant, setSelectedParticipant] = useState<string>('');

  useEffect(() => {
    const fetchParticipants = async () => {
      await initializeAndFetchParticipants();
    };
    fetchParticipants();
  }, [initializeAndFetchParticipants]);
=======
  const { users } = useUsers();

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser, setSelectedUser]);
>>>>>>> 7102dcd (task10-KAN-81 Implement user-comments:):src/components/Navbar/Navbar.tsx

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

<<<<<<< HEAD:src/components/navbar/Navbar.tsx
  const handleParticipantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedParticipant(e.target.value);
=======
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = users.find((user) => String(user.id) === e.target.value);
    setSelectedUser(user || null);
>>>>>>> 7102dcd (task10-KAN-81 Implement user-comments:):src/components/Navbar/Navbar.tsx
  };

  const languageOptions = [
    { value: Language.ENGLISH, label: 'English' },
    { value: Language.GERMAN, label: 'Deutsch' },
  ];

<<<<<<< HEAD:src/components/navbar/Navbar.tsx
  const participantOptions = participants.map((participant) => ({
    value: String(participant.id),
    label: `${participant.firstName} ${participant.name}`,
  }));

  useEffect(() => {
    if (participants.length > 0 && !selectedParticipant) {
      setSelectedParticipant(String(participants[0].id));
    }
  }, [participants, selectedParticipant]);

=======
  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: `${user.firstName} ${user.lastName}`,
  }));

>>>>>>> 7102dcd (task10-KAN-81 Implement user-comments:):src/components/Navbar/Navbar.tsx
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
<<<<<<< HEAD:src/components/navbar/Navbar.tsx
          name="participant"
          value={selectedParticipant}
          onChange={handleParticipantChange}
          options={participantOptions}
=======
          name="user"
          value={selectedUser ? String(selectedUser.id) : ''}
          onChange={handleUserChange}
          options={userOptions}
>>>>>>> 7102dcd (task10-KAN-81 Implement user-comments:):src/components/Navbar/Navbar.tsx
          className="user-select"
        />
      </div>
    </div>
  );
};

export default Navbar;
