import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    confirmarSenha: '',
    nome: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.nome,
          email: formData.email,
          password: formData.senha,
        }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        if (errorData.detail && errorData.detail.includes("Email already registered")) {
          alert("Este e-mail já está cadastrado. Tente outro.");
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
      <form style={formContainerStyle} onSubmit={handleSubmit}>
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
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          style={inputStyle}
          value={formData.confirmarSenha}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          style={inputStyle}
          value={formData.nome}
          onChange={handleChange}
        />
        <button type="submit" style={buttonStyle}>
          Cadastrar
        </button>
        <button style={backButtonStyle} onClick={() => navigate('/')}>
          Voltar
        </button>
      </form>
    </div>
  );
}

export default Cadastro;