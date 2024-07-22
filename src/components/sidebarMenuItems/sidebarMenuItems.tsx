import { Link, useLocation } from 'react-router-dom';
import ArrowIcon from '../../icons/arrow-down';

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path: string;
  children?: { title: string; path: string }[];
};

type RenderMenuItemProps = {
  item: MenuItem;
  isExpanded: boolean;
  toggleExpanded: (title: string) => void;
  isSelected: boolean;
};

const RenderMenuItem: React.FC<RenderMenuItemProps> = ({
  item,
  isExpanded,
  toggleExpanded,
  isSelected,
}) => {
  const location = useLocation();

  return (
    <div className="sidebar-element">
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
          <ArrowIcon className={`arrow-icon ${isExpanded ? 'expanded' : ''}`} />
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

export default RenderMenuItem;
