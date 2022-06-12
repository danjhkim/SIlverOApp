import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const NAVBAR: FC<unknown> = () => {
  return (
    <div className="navbar">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          to="/derp"
        >
          Derp
        </NavLink>
      </nav>
    </div>
  );
};

export default NAVBAR;
