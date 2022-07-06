import React from 'react';
import '../index.css';

function Nav() {
  return (
    <nav className="navbar">
        <p className="navText">Cardamom Price Tracker</p>
    </nav>
  );
}

function Foot(){
  return(
    <footer>
      <div className='footer'>
        <p>© Cyril C Thomas</p>
      </div>
    </footer>
  )
}

export {Nav, Foot};