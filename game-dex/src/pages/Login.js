import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        login({ user: data.user, token: data.access_token });
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        const errorData = await response.json();
        if (errorData.detail && errorData.detail.includes('Invalid email or password')) {
          alert('E-mail ou senha inválidos. Tente novamente.');
        } else {
          alert(`Erro: ${errorData.detail || errorData.message || JSON.stringify(errorData)}`);
        }
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div style={inputContainerStyle}>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                style={inputStyle}
                value={formData.senha}
                onChange={handleChange}
              />
              <p
                style={forgotPasswordStyle}
                onClick={() => navigate('/forgotpassword')}
              >
                Esqueceu a senha?
              </p>
            </div>
            <button type="submit" style={loginButtonStyle}>
              Login
            </button>
          </form>
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