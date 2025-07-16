'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onAboutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isThemeDropdownVisible, setIsThemeDropdownVisible] = useState(false);

  const handleThemeChange = (newTheme: any) => {
    setTheme(newTheme);
    setIsThemeDropdownVisible(false);
  };

  return (
    <header className="site-header">
      <div className="header-left">
        <Link href="/" className="logo-link">
          <div className="logo-box">
            <Image src="/images/logo.svg" alt="OFFSET GARAGE Logo" fill style={{ objectFit: 'contain' }} />
          </div>
        </Link>
        <nav className="header-nav">
          <Link href="/inkdrop" className="nav-button">Inkdrop</Link>
          <button className="nav-button" onClick={onAboutClick}>About</button>
        </nav>
      </div>
      <div className="theme-switcher">
        <button
          id="theme-toggle-button"
          className="theme-button"
          onClick={() => setIsThemeDropdownVisible(!isThemeDropdownVisible)}
        >
          ({theme.toUpperCase()})
        </button>
        <div id="theme-dropdown" className={`theme-dropdown ${isThemeDropdownVisible ? '' : 'hidden'}`}>
          <button data-theme="system" onClick={() => handleThemeChange('system')}>SYSTEM</button>
          <button data-theme="light" onClick={() => handleThemeChange('light')}>LIGHT</button>
          <button data-theme="dark" onClick={() => handleThemeChange('dark')}>DARK</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
