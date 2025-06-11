import React, { useState } from "react";
import avatar from "../assets/avatar-perfil.png";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";
import { searchGamesByName } from "../service/gameService";


function Header({ searchTerm, setSearchTerm, onSearchResults, onLoading  }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
  const { user, logout } = useAuth();

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
    padding: '5px 10px 5px 34px',
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

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (onLoading) onLoading(true); // INICIA LOADING
      try {
        const data = await searchGamesByName({ name: localSearchTerm, page: 1, page_size: 10 });
        setSearchTerm(localSearchTerm);
        if (onSearchResults) onSearchResults(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        alert("Erro ao buscar jogos por nome.");
        if (onSearchResults) onSearchResults([]);
      } finally {
        if (onLoading) onLoading(false); // FINALIZA LOADING
      }
    }
  };

  // Estados para animação
  const [logoHover, setLogoHover] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [cadastroHover, setCadastroHover] = useState(false);

  return (
    <header style={headerStyle}>
      <nav style={navbarStyle}>
        <div className="logo">
          <a
            href="/"
            style={{
              ...logoStyle,
              transform: logoHover ? 'scale(1.3)' : 'scale(1)',
            }}
            onMouseOver={() => setLogoHover(true)}
            onMouseOut={() => setLogoHover(false)}
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
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
                if (e.target.value.trim() === "" && onSearchResults) {
                  onSearchResults(null); // limpa busca ao apagar
                }
              }}
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
              style={{
                ...avatarStyle,
                transform: avatarHover ? 'scale(1.2)' : 'scale(1)'
              }}
              onMouseOver={() => setAvatarHover(true)}
              onMouseOut={() => setAvatarHover(false)}
            />
          </li>
          {user ? (
            <>
              <li style={{ color: "white", fontWeight: "bold" }}>
                {user.nome || user.first_name || user.email}
              </li>
              <li>
                <button
                  style={{ ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                  onClick={logout}
                >
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  href="/login"
                  style={{
                    ...linkStyle,
                    transform: loginHover ? 'scale(1.1)' : 'scale(1)',
                    color: loginHover ? '#FFFFFF' : 'white',
                    textShadow: loginHover ? '0 0 10px #FFFFFF' : 'none'
                  }}
                  onMouseOver={() => setLoginHover(true)}
                  onMouseOut={() => setLoginHover(false)}
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/cadastro"
                  style={{
                    ...linkStyle,
                    transform: cadastroHover ? 'scale(1.1)' : 'scale(1)',
                    color: cadastroHover ? '#FFFFFF' : 'white',
                    textShadow: cadastroHover ? '0 0 10px #FFFFFF' : 'none'
                  }}
                  onMouseOver={() => setCadastroHover(true)}
                  onMouseOut={() => setCadastroHover(false)}
                >
                  Cadastro
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;