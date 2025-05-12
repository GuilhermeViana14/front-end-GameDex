import React from 'react';
import avatar from '../assets/avatar-perfil.png'


function Header() {
  const headerStyle = {
    backgroundColor: '#1A1A1A',
    color: 'white',
    padding: '10px 20px',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const navLinksStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    alignItems: 'center', 
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  const searchBarStyle = {
    flex: 1,
    margin: '0 20px',
    display: 'flex',
    justifyContent: 'center',
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '1400px',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid white',
    cursor: 'pointer',
  };

  return (
    <header style={headerStyle}>
      <nav style={navbarStyle}>
        <div className="logo">
          <a href="/" style={logoStyle}>GameDex</a>
        </div>
        <div style={searchBarStyle}>
          <input
            type="text"
            placeholder="Search games..."
            style={inputStyle}
          />
        </div>
        <ul style={navLinksStyle}>
        <li>
            <img
              src={avatar}  
              alt="Profile Avatar"
              style={avatarStyle}
            />
          </li>
          
          <li>
            <a href="/" style={linkStyle}>Login</a>
          </li>
          <li>
            <a href="/about" style={linkStyle}>Cadastro</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

