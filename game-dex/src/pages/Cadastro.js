import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  };

  const formContainerStyle = {
    backgroundColor: '#282828',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px #282828',
    width: '400px',
    height: '600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  const inputStyle = {
    width: '70%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '1rem',
    backgroundColor: '#EEEEEE',
    color: 'black',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  };

  const buttonStyle = {
    width: '50%',
    padding: '10px',
    marginTop: '60px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#2C2C2C',
    color: 'white',
  };

  const backButtonStyle = {
    width: '50%',
    padding: '10px',
    margin: '20px 0 10px 0',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#2C2C2C',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <input type="email" placeholder="E-mail" style={inputStyle} />
        <input type="password" placeholder="Senha" style={inputStyle} />
        <input type="password" placeholder="Confirmar Senha" style={inputStyle} />
        <input type="text" placeholder="Nome" style={inputStyle} />
        <button style={buttonStyle}>Cadastrar</button>
        <button style={backButtonStyle} onClick={() => navigate('/')}>
        Voltar
      </button>
      </div>
    </div>
  );
}

export default Cadastro;