import React, { useState } from "react";
import avatar from "../assets/avatar-perfil.png";
import { FaSearch } from "react-icons/fa";

function Header({ searchTerm, setSearchTerm }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

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
    transition: 'transform 0.3s ease, text-shadow 0.3s ease',
    display: 'inline-block'
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
    alignItems: 'center'
  };

  // Para a lupa dentro do input
  const inputWrapperStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '1400px',
    display: 'flex',
    alignItems: 'center',
  };

  const inputIconStyle = {
    position: 'absolute',
    left: '12px',
    color: '#ccc',
    fontSize: '1.1rem',
    pointerEvents: 'none'
  };

  const inputStyle = {
    width: '100%',
    maxWidth: '1400px',
    padding: '5px 10px 5px 34px', // espaço para a lupa
    borderRadius: '10px',
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchTerm(localSearchTerm);
    }
  };

  return (
    <header style={headerStyle}>
      <nav style={navbarStyle}>
        <div className="logo">
          <a
            href="/"
            style={logoStyle}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.3)';
              e.target.style.textShadow = 'none';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.textShadow = 'none';
            }}
          >
            GameDex
          </a>
        </div>
        <div style={searchBarStyle}>
          <div style={inputWrapperStyle}>
            <FaSearch style={inputIconStyle} />
            <input
              type="text"
              placeholder="Search games..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              style={inputStyle}
            />
          </div>
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
              href="/login"
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
              href="/cadastro"
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