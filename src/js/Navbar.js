import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ page }) => {
  return (
    <div className="navbar">
      <span className="navbar__title">Formatex</span>
      <Link to={page == 'home' ? '/help' : '/'} className="navbar__subtitle">
        {page == 'home' ? 'Help' : 'Home'}
      </Link>
    </div>
  );
};

export default Navbar;
