import React from 'react';

function Navbar({ serverStatus, onHome }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button type="button" className="navbar-logo" onClick={onHome}>
          <span className="logo-text">Diagnóstico Vehicular</span>
        </button>
        <div className="navbar-status">
          <span className={`status-indicator ${serverStatus}`}></span>
          <span id="statusText">
            {serverStatus === 'connected' && 'Backend conectado'}
            {serverStatus === 'error' && 'Modo local'}
            {serverStatus === 'checking' && 'Conectando...'}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
