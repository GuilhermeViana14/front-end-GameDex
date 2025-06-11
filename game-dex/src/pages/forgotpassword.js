import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (!email) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
      });

      if (response.ok) {
        alert(`Um e-mail foi enviado para ${email} com instruções para redefinir sua senha.`);
        setEmail('');
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.detail || 'Não foi possível enviar o e-mail.'}`);
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    ...styles.button,
    opacity: loading ? 0.7 : 1,
    cursor: loading ? 'not-allowed' : 'pointer',
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

  return (
    <div style={styles.container}>
      <button style={backButtonStyle} onClick={() => navigate('/login')}>
        Voltar
      </button>
      <div style={styles.card}>
        <h2 style={styles.title}>Recuperar Senha</h2>
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleSendEmail} style={buttonStyle} disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar e-mail'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#d9d9d9',
    margin: 0,
  },
  card: {
    backgroundColor: '#1c1c1c',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '1.5rem',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '250px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  button: {
    width: '250px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '16px',
  },
};

export default ForgotPassword;