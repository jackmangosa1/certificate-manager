import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ className }: { className: string }) => {
  return (
    <div className={`navbar ${className}`}>
      <div className="left">
        <Link to="/">
          <h1>DCCS Tuzla</h1>
        </Link>
      </div>
      <div className="right">
        <p>test</p>
      </div>
    </div>
  );
};

export default Navbar;
