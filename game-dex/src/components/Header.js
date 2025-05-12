import React from 'react';
import avatar from '../assets/avatar-perfil.png';

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
    transition: 'transform 0.3s ease', // Transição suave para o efeito de escala
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
    transition: 'all 0.3s ease',
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
    transition: 'transform 0.3s ease',
  };

  return (
    <header style={headerStyle}>
      <nav style={navbarStyle}>
        <div className="logo">
          <a
            href="/"
            style={logoStyle}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.2)'; // Apenas aumenta o tamanho
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)'; // Volta ao tamanho original
            }}
          >
            GameDex
          </a>
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
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          </li>
          <li>
            <a
              href="/"
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.color = '#FFFFFF';
                e.target.style.textShadow = '0 0 10px #FFFFFF';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.color = 'white';
                e.target.style.textShadow = 'none';
              }}
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/about"
              style={linkStyle}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.color = '#FFFFFF';
                e.target.style.textShadow = '0 0 10px #FFFFFF';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.color = 'white';
                e.target.style.textShadow = 'none';
              }}
            >
              Cadastro
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;