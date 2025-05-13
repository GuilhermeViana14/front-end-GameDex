import React, { useEffect, useState } from "react";
import SearchCard from '../components/searchCard'; // Importando o componente SearchCard

const platformImages = {
  xbox: "/platform-icons/icons8-xbox-50.png",
  playstation: "/platform-icons/icons8-playstation-50.png",
  pc: "/platform-icons/icons8-pc-50.png",
  switch: "/platform-icons/icons8-nintendo-switch-handheld-50.png",
  nintendo: "/platform-icons/icons8-nintendo-50.png",
  android: "/platform-icons/icons8-android-50.png",
  ios: "/platform-icons/icons8-ios-50.png",
  default: "/platform-icons/icons8-default-32.png",
};

const getPlatformKey = (platformName) => {
  if (!platformName) return "default";
  const name = platformName.toLowerCase();
  if (name.includes("playstation")) return "playstation";
  if (name.includes("xbox")) return "xbox";
  if (name.includes("pc")) return "pc";
  if (name.includes("switch")) return "switch";
  if (name.includes("nintendo")) return "nintendo";
  if (name.includes("android")) return "android";
  if (name.includes("ios")) return "ios";
  return "default";
};

const ListGames = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredAddBtn, setHoveredAddBtn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            setGames(data.results);
          } else {
            setGames((prevGames) => [...prevGames, ...data.results]);
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

  const getGridColumns = () => {
    if (windowWidth >= 1200) return "repeat(4, 1fr)";
    if (windowWidth >= 768) return "repeat(3, 1fr)";
    return "repeat(2, 1fr)";
  };

  const styles = {
   container: {
    padding: windowWidth >= 768 ? "20px" : "10px",
    backgroundColor: "#1a1a1a",
    color: "white",
    maxWidth: "1500px",
    width: windowWidth >= 768 ? "calc(100% - 300px)" : "100%", // Ajusta a largura dinamicamente
    marginLeft: windowWidth >= 768 ? "300px" : "0", // Remove a margem em telas pequenas
    marginTop: "10px",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  gamesGrid: {
    display: "grid",
    gridTemplateColumns: getGridColumns(),
    gap: "20px",
  },
  gameCard: (isHovered) => ({
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    overflow: "hidden",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    width: "100%",
    height: windowWidth >= 768 ? "327px" : "250px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  }),
  gameImage: {
    width: "100%",
    height: windowWidth >= 768 ? "200px" : "150px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  cardContent: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
  },
  platformIcons: {
    fontSize: "18px",
    marginBottom: "8px",
    display: "flex",
    gap: "6px",
  },
  gameTitle: {
    fontSize: windowWidth >= 768 ? "20px" : "16px", // Fonte menor em telas pequenas
    fontWeight: "bold",
    margin: "0",
    color: "#fff",
    textAlign: "left",
    lineHeight: "1.2",
    wordBreak: "break-word",
  },
    addButton: {
      position: "absolute",
      bottom: "16px",
      right: "16px",
      background: "none",
      color: "#fff",
      border: "none",
      borderRadius: "0",
      width: "auto",
      height: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      cursor: "pointer",
      boxShadow: "none",
      transition: "color 0.2s, transform 0.2s, text-shadow 0.2s",
      padding: 0,
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

  // Estilos globais para animação do spinner
  useEffect(() => {
    const globalStyles = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <><div>
      <SearchCard />
    </div><div style={styles.container}>
        {error && <p>{error}</p>}
        <div style={styles.gamesGrid}>
          {games.map((game) => {
            const uniquePlatforms = [];
            const seen = new Set();
            if (game.platforms) {
              game.platforms.forEach((p) => {
                const key = getPlatformKey(p.platform ? p.platform.name : p.name);
                if (!seen.has(key)) {
                  seen.add(key);
                  uniquePlatforms.push(key);
                }
              });
            }
            return (
              <div
                key={game.id}
                style={styles.gameCard(hoveredCard === game.id)}
                onMouseOver={() => setHoveredCard(game.id)}
                onMouseOut={() => setHoveredCard(null)}
              >
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={styles.gameImage} />
                <div style={styles.cardContent}>
                  <div style={styles.platformIcons}>
                    {uniquePlatforms.map((key) => (
                      <img
                        key={key}
                        src={platformImages[key]}
                        alt={key}
                        style={{ width: 22, height: 22 }} />
                    ))}
                  </div>
                  <div style={styles.gameTitle}>{game.name}</div>
                </div>
                <button
                  className="add-btn"
                  style={{
                    ...styles.addButton,
                    textShadow: hoveredAddBtn === game.id
                      ? "0 0 12px #fff, 0 0 24px #fff"
                      : "none",
                    transform: hoveredAddBtn === game.id
                      ? "scale(1.2)"
                      : "scale(1)",
                  }}
                  title="Adicionar"
                  onClick={() => alert(`Adicionar ${game.name}`)}
                  onMouseOver={() => setHoveredAddBtn(game.id)}
                  onMouseOut={() => setHoveredAddBtn(null)}
                >
                  +
                </button>
              </div>
            );
          })}
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
      </div></>
  );
};

export default ListGames;