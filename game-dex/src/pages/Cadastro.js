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
    padding: '20px', // Adicionado para evitar que o conteúdo encoste nas bordas em telas menores
  };

  const formContainerStyle = {
    backgroundColor: '#282828',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px #282828',
    width: '90%', // Ajustado para ocupar 90% da largura da tela em dispositivos menores
    maxWidth: '400px', // Limite máximo para telas maiores
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  const inputStyle = {
    width: '100%', // Ajustado para ocupar toda a largura disponível
    maxWidth: '300px', // Limite máximo para inputs
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
    width: '100%', // Ajustado para ocupar toda a largura disponível
    maxWidth: '200px', // Limite máximo para botões
    padding: '10px',
    marginTop: '20px',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#2C2C2C',
    color: 'white',
  };

  const backButtonStyle = {
    ...buttonStyle,
    marginTop: '10px', // Ajustado para menor espaçamento entre os botões
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