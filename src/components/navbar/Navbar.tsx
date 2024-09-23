import './Navbar.css';
import { Link } from 'react-router-dom';
import CustomSelect from '../custom-select/CustomSelect';
import { useLanguage } from '../../hooks/useLanguage';
import { useUsers } from '../../hooks/useUsers'; // Updated import
import { Language } from '../../types/types';
import { useState, useEffect } from 'react';
import MenuIcon from '../../icons/Menu';
import { useUser } from '../../context/UserContext';

type NavBarProps = {
  className: string;
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavBarProps> = ({ className, toggleSidebar }) => {
  const { language, setLanguage, translations } = useLanguage();
  const { users, refetch } = useUsers(); // Updated to use users
  const { setSelectedUser } = useUser();
  const [selectedUser, setSelectedUserLocal] = useState<string>('');

  useEffect(() => {
    refetch(); // Fetch users on component mount
  }, [refetch]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    setSelectedUserLocal(userId);
    const selectedUserData = users.find((user) => String(user.id) === userId);
    if (selectedUserData) {
      setSelectedUser(selectedUserData);
    }
  };

  const languageOptions = [
    { value: Language.ENGLISH, label: 'English' },
    { value: Language.GERMAN, label: 'Deutsch' },
  ];

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: `${user.firstName} ${user.lastName}`,
  }));

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      const firstUserId = String(users[0].id);
      setSelectedUserLocal(firstUserId);
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser, setSelectedUser]);

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
          id="user"
          label={translations.user}
          name="user"
          value={selectedUser}
          onChange={handleUserChange}
          options={userOptions}
          className="user-select"
        />
      </div>
    </div>
  );
};

export default Navbar;
