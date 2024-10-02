import './Navbar.css';
import { Link } from 'react-router-dom';
import CustomSelect from '../custom-select/CustomSelect';
import { useLanguage } from '../../hooks/useLanguage';
import { useUsers } from '../../hooks/useUsers';
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
  const { users } = useUsers();
  const { setSelectedUser } = useUser();
  const [selectedUser, setSelectedUserLocal] = useState<string>('');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userName = e.target.value;
    setSelectedUserLocal(userName);

    const selectedUserData = users.find((user) => user.username === userName);

    if (selectedUserData) {
      setSelectedUser(selectedUserData);
    }
  };

  const languageOptions = [
    { value: Language.ENGLISH, label: 'English' },
    { value: Language.GERMAN, label: 'Deutsch' },
  ];

  const userOptions = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      const firstUserName = users[0].username;
      setSelectedUserLocal(firstUserName);
      setSelectedUser(users[0]);
    }
  }, [users, setSelectedUser]);

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