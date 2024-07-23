import './Navbar.css';
import { Link } from 'react-router-dom';

type NavBarProps = {
  className: string;
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavBarProps> = ({ className, toggleSidebar }) => {
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
          <h1>DCCS Tuzla</h1>
        </Link>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Navbar;
