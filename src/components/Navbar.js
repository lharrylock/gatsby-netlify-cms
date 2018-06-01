import React from 'react'
import Link from 'gatsby-link'

import logo from '../img/logo.svg'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <figure className="image">
            <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
          </figure>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/products">
            Microscopy
          </Link>
          <Link className="navbar-item" to="/subtool/visual-guide">
            Visual Guide
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Navbar
