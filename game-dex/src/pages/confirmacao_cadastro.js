import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  minHeight: "100vh",
  background: "#e1e1e1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  background: "#151515",
  borderRadius: "16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  padding: "48px 32px 32px 32px",
  width: "100%",
  maxWidth: "420px",
  minHeight: "420px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const buttonStyle = {
  marginTop: "32px",
  width: "180px",
  padding: "10px 0",
  borderRadius: "8px",
  border: "none",
  background: "#222",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
  transition: "background 0.2s",
};

const titleStyle = {
  color: "#fff",
  fontSize: "1.3rem",
  marginBottom: "32px",
  fontWeight: "bold",
  textAlign: "center",
};

function ConfirmacaoCadastro() {
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  // Pega o token da URL (?token=...)
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const handleConfirmar = async (e) => {
    e.preventDefault();
    if (!token) {
      setMensagem("Token não encontrado na URL.");
      return;
    }
    setLoading(true);
    setMensagem("");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/confirm-email?token=${encodeURIComponent(token)}`, {
        method: "GET",
        headers: { "accept": "application/json" },
      });
      if (response.ok) {
        setMensagem("Cadastro confirmado com sucesso!");
        setSucesso(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Aguarda 1,5s para mostrar a mensagem antes de redirecionar
      } else {
        setMensagem("Erro ao confirmar cadastro.");
      }
    } catch {
      setMensagem("Erro ao conectar ao servidor.");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <form style={cardStyle} onSubmit={handleConfirmar}>
        <div style={titleStyle}>Confirmação de Cadastro</div>
        <button
          type="submit"
          style={buttonStyle}
          disabled={loading || sucesso}
        >
          {loading ? "Confirmando..." : "Confirmar cadastro"}
        </button>
        {mensagem && (
          <div style={{ color: "#fff", marginTop: "24px", textAlign: "center" }}>
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}

export default ConfirmacaoCadastro;