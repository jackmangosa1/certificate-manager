import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

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
      icon: (
        <svg
          viewBox="0 0 576 512"
          xmlns="http://www.w3.org/2000/svg"
          className="home-icon"
        >
          <path d="m280.37 148.26 -184.37 151.85v163.89a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16v-95.71a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05l112.02.31a16 16 0 0 0 16-16v-164l-184.33-151.74a12.19 12.19 0 0 0 -15.3 0zm291.23 103.21-83.6-68.91v-138.51a12 12 0 0 0 -12-12h-56a12 12 0 0 0 -12 12v72.61l-89.53-73.66a48 48 0 0 0 -61 0l-253.13 208.47a12 12 0 0 0 -1.6 16.9l25.5 31a12 12 0 0 0 16.91 1.63l235.22-193.74a12.19 12.19 0 0 1 15.3 0l235.23 193.74a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0 -1.7-16.93z" />
        </svg>
      ),
      path: '/',
    },
    {
      title: 'Machine Learning',
      icon: (
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="menu-icon"
        >
          <path
            d="m0 0h24v24h-24z"
            fill="none"
          />
          <path d="m3 18h18v-2h-18zm0-5h18v-2h-18zm0-7v2h18v-2z" />
        </svg>
      ),
      path: '/machine-learning',
      children: [
        { title: 'Example 1', path: '/machine-learning/example1' },
        { title: 'Example 2', path: '/machine-learning/example2' },
        { title: 'Example 3', path: '/machine-learning/example3' },
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

  const renderMenuItem = (item: MenuItem) => {
    const isSelected =
      location.pathname === item.path ||
      (item.children &&
        item.children.some((child) => location.pathname === child.path));
    const isExpanded = expandedItems.includes(item.title);

    return (
      <div
        key={item.title}
        className="sidebar-element"
      >
        <Link
          to={item.path}
          className={`menu-item ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (item.children) {
              toggleExpanded(item.title);
            }
          }}
        >
          {item.icon}
          {item.title}
          {item.children && (
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={`arrow-icon ${isExpanded ? 'expanded' : ''}`}
            >
              <path d="m8.12 9.29 3.88 3.88 3.88-3.88c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0l-4.59-4.59c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" />
            </svg>
          )}
        </Link>
        {item.children && isExpanded && (
          <ul className="list-body expanded">
            {item.children.map((child) => (
              <li key={child.title}>
                <Link
                  to={child.path}
                  className={`child-item ${location.pathname === child.path ? 'selected' : ''}`}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className={`sidebar ${className}`}>
      {menuItems.map((item) => renderMenuItem(item))}
    </div>
  );
};

export default Sidebar;
