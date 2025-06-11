import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // Hook para redirecionamento
  const token = searchParams.get('token'); // Captura o token da URL

  const handleSavePassword = async () => {
    if (!password || !confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      console.log('Token capturado:', token);
      console.log('Dados enviados:', {
        token: token,
        new_password: password,
      });

      // Monta a URL com os parâmetros de query
      const url = `http://127.0.0.1:8000/api/reset-password?token=${encodeURIComponent(
        token
      )}&new_password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Senha redefinida com sucesso!');
        setPassword('');
        setConfirmPassword('');
        navigate('/login'); // Redireciona para a página de login
      } else {
        const errorData = await response.json();
        console.error('Erro na resposta:', JSON.stringify(errorData, null, 2));
        alert(`Erro: ${errorData.detail || 'Não foi possível redefinir a senha.'}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Redefinir Senha</h2>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleSavePassword} style={buttonStyle} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar nova senha'}
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

export default ResetPassword;