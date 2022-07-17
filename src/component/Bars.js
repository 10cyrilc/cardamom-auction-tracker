import React from 'react';
import '../index.css';
import { FaTwitter, FaGithub, FaCoffee } from 'react-icons/fa';

function Nav() {
  return (
    <nav className="navbar">
        <p className="navText">Cardamom Price Tracker</p>
    </nav>
  );
}

function Foot(){
  return(
      <div className='footer'>
        <p>© Cyril C Thomas</p>
        <div className='icons'>
          <a href="https://www.twitter.com/10cyrilc/"><FaTwitter /></a>
          <a href="https://www.github.com/10cyrilc/"><FaGithub /></a>
          <a href="https://www.buymeacoffee.com/10cyrilc/"><FaCoffee /></a>
        </div>
      </div>
  )
}

export {Nav, Foot};