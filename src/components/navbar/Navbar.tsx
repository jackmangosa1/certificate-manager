import './Navbar.css';
import { Link } from 'react-router-dom';
import CustomSelect from '../custom-select/CustomSelect';
import { useLanguage } from '../../hooks/useLanguage';
import { useUsers } from '../../hooks/useUsers';
import { Language, User } from '../../types/types';
import { useState, useEffect } from 'react';

type NavBarProps = {
  className: string;
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavBarProps> = ({ className, toggleSidebar }) => {
  const { language, setLanguage, translations } = useLanguage();
  const { users } = useUsers();
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  const languageOptions = [
    { value: Language.ENGLISH, label: 'English' },
    { value: Language.GERMAN, label: 'Deutsch' },
  ];

  const userOptions = users.map((user: User) => ({
    value: String(user.id),
    label: `${user.firstName} ${user.lastName}`,
  }));

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(String(users[0].id));
    }
  }, [users, selectedUser]);

  return (
    <div className={`navbar ${className}`}>
      <div className="left">
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="menu-icon-header"
          onClick={toggleSidebar}
        >
          <path
            d="m0 0h24v24h-24z"
            fill="none"
          />
          <path d="m3 18h18v-2h-18zm0-5h18v-2h-18zm0-7v2h18v-2z" />
        </svg>
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
