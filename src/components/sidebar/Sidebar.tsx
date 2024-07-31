import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';
import { AppRoutes } from '../../routes/routes';
import HomeIcon from '../../icons/Home';
import MenuIcon from '../../icons/Menu';
import SidebarMenuItems from '../sidebar-menu-items/SidebarMenuItems';
import { useLanguage } from '../../hooks/useLanguage';

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
  const { translations } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

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
    </div>
  );
};

export default Sidebar;
