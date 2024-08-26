import { Outlet, Link } from "react-router-dom";
import "../styles/Header/index.css";

function Header() {
  return (
    <>
      <nav className="header__container">
        <div className="header__logo">
          <img src="/budget.png" alt="Logo" className="header__logo-image" />
          <span className="header__title">Expense Tracker</span>
        </div>
        <ul className="header__nav">
          <li className="header__nav-item">
            <Link to="/">Login</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/register">Register</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
