import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';
import { AppRoutes } from '../../routes/routes';
import HomeIcon from '../../icons/home';
import MenuIcon from '../../icons/menu';
import RenderMenuItems from '../renderMenuItems/RenderMenuItems';

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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      title: 'Start',
      icon: <HomeIcon className="home-icon" />,
      path: AppRoutes.Home,
    },
    {
      title: 'Machine Learning',
      icon: <MenuIcon className="menu-icon" />,
      path: AppRoutes.MachineLearning,
      children: [
        { title: 'Example 1', path: AppRoutes.Example1 },
        { title: 'Example 2', path: AppRoutes.Example2 },
        { title: 'Example 3', path: AppRoutes.Example3 },
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
          <RenderMenuItems
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
