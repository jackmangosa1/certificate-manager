import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';
import { AppRoutes } from '../../routes/routes';
import HomeIcon from '../../icons/Home';
import MenuIcon from '../../icons/Menu';
import SidebarMenuItems from '../sidebar-menu-items/SidebarMenuItems';
import { useLanguage } from '../../hooks/useLanguage';
import { Language } from '../../types/types';
import { useUser } from '../../context/UserContext';
import { useUsers } from '../../hooks/useUsers';
import CustomSelect from '../custom-select/CustomSelect';

type SidebarProps = {
  className: string;
};

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: { title: string; path: string }[];
};

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { translations, language, setLanguage } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { users } = useUsers();
  const { selectedUser, setSelectedUser } = useUser();

  const languageOptions = [
    { value: Language.ENGLISH, label: 'English' },
    { value: Language.GERMAN, label: 'Deutsch' },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = users.find(
      (user) => String(user.username) === e.target.value,
    );
    setSelectedUser(user || null);
  };

  const participantOptions = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));
  const menuItems: MenuItem[] = [
    {
      title: translations.start,
      icon: <HomeIcon className="home-icon" />,
      path: AppRoutes.Home,
    },
    {
      title: translations.machineLearning,
      icon: <MenuIcon className="menu-icon" />,
      path: AppRoutes.MachineLearning,
      children: [
        { title: translations.example1, path: AppRoutes.Example1 },
        { title: translations.example2, path: AppRoutes.Example2 },
        { title: translations.example3, path: AppRoutes.Example3 },
      ],
    },
  ];

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  return (
    <div className={`sidebar ${className}`}>
      {menuItems.map((item) => {
        const isSelected =
          location.pathname === item.path ||
          (item.children
            ? item.children.some((child) => location.pathname === child.path)
            : false);
        const isExpanded = expandedItems.includes(item.title);

        return (
          <SidebarMenuItems
            key={item.title}
            item={item}
            isExpanded={isExpanded}
            toggleExpanded={toggleExpanded}
            isSelected={isSelected}
          />
        );
      })}
      <div className="dropdown-selects">
        <CustomSelect
          id="language-type"
          label={translations.language}
          name="languageType"
          value={language}
          onChange={handleLanguageChange}
          options={languageOptions}
          className="language-select-sidebar"
        />
        <CustomSelect
          id="user"
          label={translations.user}
          name="user"
          value={selectedUser ? selectedUser.username : ''}
          onChange={handleUserChange}
          options={participantOptions}
          className="user-select-sidebar"
        />
      </div>
    </div>
  );
};

export default Sidebar;
