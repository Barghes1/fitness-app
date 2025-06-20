import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaCog } from 'react-icons/fa';
import '../styles/components/_header.scss';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="main-header">
      <div className="main-header__left">
        <h1 className="main-header__logo">
          <Link to="/">
            Fitness App
          </Link>
        </h1>
        <nav className="main-header__nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/account" className={({ isActive }) => isActive ? 'active' : ''}>Account</NavLink>
          <NavLink to="/awards" className={({ isActive }) => isActive ? 'active' : ''}>Awards</NavLink>
          <NavLink to="/followers" className={({ isActive }) => isActive ? 'active' : ''}>Followers</NavLink>
        </nav>
      </div>

      <div className="main-header__right">
        <span className="main-header__user">
          Привіт, {user.firstName}
        </span>

        <Link to="/account/settings" className="main-header__settings" title="Account Settings">
          <FaCog />
        </Link>

        <button onClick={handleLogout} className="main-header__logout" title="Logout">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
