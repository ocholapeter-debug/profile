import React from 'react';
import './Header.css';
import logo from './logo.svg';

function Header({ theme, onToggleTheme }) {
  return (
    <header className="header">
      <div className="container header-container">
        <a className="logo-link" href="/">
          <img className="header-logo" src={logo} alt="Stratcom logo" />
          <span className="header-logotext">Stratcom</span>
        </a>

        <nav className="navmenu">
          <ul className="navlist">
            <li className="navitem">
              <a className="navlink" href="/">
                Home
              </a>
            </li>
            <li className="navitem">
              <a className="navlink" href="/Aboutus">
                About Us
              </a>
            </li>
            <li className="navitem">
              <a className="navlink" href="/Services">
                Services
              </a>
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
