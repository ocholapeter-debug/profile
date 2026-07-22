import React, { useState } from 'react';
import './Header.css';
import logo from './logo.svg';

function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-container">
        <a className="logo-link" href="/">
          <img className="header-logo" src={logo} alt="Stratcom logo" />
          <span className="header-logotext">CholTech</span>
        </a>

        <button
          className={`mobile-nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navmenu ${menuOpen ? 'is-open' : ''}`}>
          <ul className="navlist">
            <li className="navitem" onClick={closeMenu}>
              <a className="navlink" href="/">Home</a>
            </li>
            <li className="navitem" onClick={closeMenu}>
              <a className="navlink" href="/Aboutus">About Us</a>
            </li>
            <li className="navitem" onClick={closeMenu}>
              <a className="navlink" href="/Services">Services</a>
            </li>
            <li className="navitem" onClick={closeMenu}>
              <a className="navlink" href="/Login">Login</a>
            </li>
            <li className="navitem" onClick={closeMenu}>
              <a className="navlink" href="/Signup">Signup</a>
            </li>
          </ul>
        </nav>

        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;
