import React, { useEffect, useState } from "react";

const ListGames = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null); // Estado para rastrear o card em hover

  useEffect(() => {
  const fetchGames = () => {
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/api/games?page=${page}&page_size=20`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        if (page === 1) {
          setGames(data.results); // Substitui ao carregar a primeira página
        } else {
          setGames((prevGames) => [...prevGames, ...data.results]); // Adiciona nas próximas páginas
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setError("Erro ao carregar jogos. Tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  fetchGames();
}, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#1a1a1a",
      color: "white",
      maxWidth: "1500px",
      width: "100%",
      marginLeft: "300px",
      marginTop: "10px",
    },
    gamesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)", 
      gap: "30px",
    },
    gameCard: (isHovered) => ({
      backgroundColor: "#2a2a2a",
      borderRadius: "10px",
      overflow: "hidden",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s, box-shadow 0.2s",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      width: "100%",
      maxWidth: "426px",
      height: "327px",
    }),
    gameImage: {
      width: "100%",
      height: "250px",
      objectFit: "cover",
    },
    gameTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      margin: "10px 0",
      color: "#fff",
    },
    loadMoreButton: {
      display: "block",
      margin: "20px auto",
      padding: "10px 20px",
      backgroundColor: "#2a2a2a",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    loadingSpinner: {
      margin: "20px auto",
      border: "4px solid rgba(255, 255, 255, 0.3)",
      borderTop: "4px solid white",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      animation: "spin 1s linear infinite",
    },
  };

  // Adicione a animação no estilo global (CSS-in-JS ou arquivo CSS separado)
  const globalStyles = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  `;

  // Adicione o estilo global ao documento
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);

  return (
    <div style={styles.container}>
      {error && <p>{error}</p>}
      <div style={styles.gamesGrid}>
        {games.map((game) => (
          <div
            key={game.id}
            style={styles.gameCard(hoveredCard === game.id)}
            onMouseOver={() => setHoveredCard(game.id)} // Define o card em hover
            onMouseOut={() => setHoveredCard(null)} // Remove o hover
          >
            <img
              src={game.background_image}
              alt={game.name}
              style={styles.gameImage}
            />
            <h2 style={styles.gameTitle}>{game.name}</h2>
          </div>
        ))}
      </div>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={styles.loadingSpinner}></div>
          <p>Carregando...</p>
        </div>
      ) : (
        <button style={styles.loadMoreButton} onClick={handleLoadMore}>
          Carregar Mais
        </button>
      )}
    </div>
  );
};

export default ListGames;