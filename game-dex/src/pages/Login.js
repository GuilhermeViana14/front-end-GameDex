import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    margin: 0,
  };

  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: '#2C2C2C',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const leftPanelStyle = {
    flex: 1,
    backgroundColor: '#1A1A1A',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  const rightPanelStyle = {
    flex: 1,
    backgroundColor: '#D9D9D9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formContainerStyle = {
    backgroundColor: '#282828',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '500px',
    textAlign: 'center',
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const inputStyle = {
    width: '360px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #eeeeee',
    fontSize: '1rem',
  };

  const forgotPasswordStyle = {
    color: '#FFFFFF',
    fontSize: '0.9rem',
    alignSelf: 'flex-start',
    marginLeft: '58px',
    cursor: 'pointer',
  };

  const buttonStyle = {
    width: '265px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2C2C2C',
    color: 'white',
  };

  const registerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2C2C2C',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={() => navigate('/')}>
        Voltar
      </button>
      <div style={leftPanelStyle}>
        Gamedex <br /> Sua biblioteca de jogos
      </div>
      <div style={rightPanelStyle}>
        <div style={formContainerStyle}>
          <div style={inputContainerStyle}>
            <input type="email" placeholder="E-mail" style={inputStyle} />
            <input type="password" placeholder="Senha" style={inputStyle} />
            <p style={forgotPasswordStyle}>Esqueceu a senha?</p>
          </div>
          <button style={loginButtonStyle}>Login</button>
          <button
            style={registerButtonStyle}
            onClick={() => navigate('/cadastro')}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;