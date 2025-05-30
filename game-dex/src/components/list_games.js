import React, { useEffect, useState } from "react";
import SearchCard from '../components/searchCard';
import { useAuth } from "../components/AuthContext";

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

const generoSlugMap = {
  "Ação": "action",
  "Indie": "indie",
  "Aventura": "adventure",
  "RPG": "role-playing-games-rpg",
  "Estratégia": "strategy",
  "Shooter": "shooter",
  "Casual": "casual",
  "Simulação": "simulation",
  "Puzzle": "puzzle",
  "Arcade": "arcade",
  "Platformer": "platformer",
  "Massively Multiplayer": "massively-multiplayer",
  "Racing": "racing",
  "Esporte": "sports",
  "Fighting": "fighting",
  "Família": "family",
  "Board Games": "board-games",
  "Educacional": "educational",
  "Card": "card"
};

const devSlugMap = {
  "Rockstar Games": "rockstar-games",
  "Rockstar": "rockstar-games",
  "Microsoft": "microsoft",
  "Sony": "sony-interactive-entertainment",
  "Nintendo": "nintendo",
  "Ubisoft": "ubisoft"
};

const plataformaFamiliaMap = {
  "PC": [4],
  "PlayStation": [187, 18, 16, 15, 27, 19, 17],
  "Xbox": [1, 186, 14, 80],
  "Nintendo Switch": [7],
  "Nintendo": [7, 8, 9, 13, 10, 11, 105, 83, 24, 43, 26, 79, 49],
  "Android": [21],
  "iOS": [3],
};

const ListGames = ({ searchTerm }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredAddBtn, setHoveredAddBtn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [checkedPlataformas, setCheckedPlataformas] = useState([]);
  const [checkedGeneros, setCheckedGeneros] = useState([]);
  const [checkedDevs, setCheckedDevs] = useState([]);
  const [bestOfYear, setBestOfYear] = useState(false);
  const [popular2024, setPopular2024] = useState(false);
  const [bestOfAllTime, setBestOfAllTime] = useState(false);


  const { token, user } = useAuth();

  // Funções para tornar os filtros mutuamente exclusivos
  const toggleBestOfYear = (value) => {
    setBestOfYear(value);
    if (value) setPopular2024(false);
    if (value) setBestOfAllTime(false);
  };

  const togglePopular2024 = (value) => {
    setPopular2024(value);
    if (value) setBestOfYear(false);
    if (value) setBestOfAllTime(false);
  };

  const toggleBestOfAlltime = (value) => {
    setBestOfAllTime(value);
    if (value) setBestOfYear(false);
    if (value) setPopular2024(false);
  }

  useEffect(() => {
    setPage(1);
    setGames([]);
    setLoading(true);
  }, [checkedPlataformas, checkedGeneros, checkedDevs, searchTerm, bestOfYear, popular2024, bestOfAllTime]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: page,
      page_size: 20
    });

    if (checkedGeneros.length > 0) {
      const slug = generoSlugMap[checkedGeneros[0]] || checkedGeneros[0];
      params.append('genre', slug);
    }

    if (checkedDevs.length > 0) {
      const devSlug = devSlugMap[checkedDevs[0]] || checkedDevs[0];
      params.append('developer', devSlug);
    }

    if (checkedPlataformas.length > 0) {
      const allIds = checkedPlataformas
        .flatMap(nome => plataformaFamiliaMap[nome] || [])
        .join(",");
      params.append('platform', allIds);
    }

    if (searchTerm && searchTerm.trim() !== "") {
      params.append('search', searchTerm);
    }

    if (bestOfYear) {
      params.append('best_of_year', 'true');
    }

    if (popular2024) {
      params.append('popular_2024', 'true');
    }

    if (bestOfAllTime) {
      params.append('best_of_all_time', 'true');
    }

    const url = `http://127.0.0.1:8000/api/games/filter?${params.toString()}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na requisição");
        return response.json();
      })
      .then((data) => {
        if (page === 1) {
          setGames(data.results || []);
        } else {
          setGames(prev => [...prev, ...(data.results || [])]);
        }
      })
      .catch(() => setError("Erro ao carregar jogos."))
      .finally(() => setLoading(false));
  }, [page, checkedPlataformas, checkedGeneros, checkedDevs, searchTerm, bestOfYear, popular2024, bestOfAllTime]);

  const handleLoadMore = () => setPage(prev => prev + 1);

  const styles = {
    container: {
      padding: windowWidth >= 768 ? "20px" : "10px",
      backgroundColor: "#1a1a1a",
      color: "white",
      maxWidth: "1500px",
      width: windowWidth >= 768 ? "calc(100% - 300px)" : "100%",
      marginLeft: windowWidth >= 768 ? "300px" : "0",
      marginTop: "10px",
      boxSizing: "border-box",
      overflowX: "hidden",
    },
    gamesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
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
      fontSize: windowWidth >= 768 ? "20px" : "16px",
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
      fontSize: "32px",
      cursor: "pointer",
      transition: "color 0.2s, transform 0.2s, text-shadow 0.2s",
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

  const handleAddGame = async (game) => {
    if (!user) {
      alert("Você precisa estar logado para adicionar jogos.");
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: game.name,
          rawg_id: game.id,
          background_img: game.background_image,
          platforms: game.platforms
            ? game.platforms.map(p => p.platform ? p.platform.name : p.name).join(', ')
            : "",
        }),
      });
      if (response.ok) {
        alert(`Jogo "${game.name}" adicionado com sucesso!`);
      } else {
        alert('Erro ao adicionar jogo.');
      }
    } catch (error) {
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <>
      <div>
        <SearchCard
          checkedPlataformas={checkedPlataformas}
          setCheckedPlataformas={setCheckedPlataformas}
          checkedGeneros={checkedGeneros}
          setCheckedGeneros={setCheckedGeneros}
          checkedDevs={checkedDevs}
          setCheckedDevs={setCheckedDevs}
          bestOfYear={bestOfYear}
          setBestOfYear={toggleBestOfYear}
          popular2024={popular2024}
          setPopular2024={togglePopular2024}
          bestOfAllTime={bestOfAllTime}
          setBestOfAllTime={toggleBestOfAlltime}
        />
      </div>
      <div style={styles.container}>
        {error && <p style={{ color: "#ff4d4f", textAlign: "center" }}>{error}</p>}

        {loading && games.length === 0 && (
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={styles.loadingSpinner}></div>
            <p>{searchTerm ? `Buscando por "${searchTerm}"...` : "Carregando..."}</p>
          </div>
        )}

        {!loading && games.length === 0 && !error && (
          <div style={{ color: "#ff4d4f", textAlign: "center", marginTop: "40px", fontWeight: "bold" }}>
            Nenhum jogo encontrado para sua busca.
          </div>
        )}

        {games.length > 0 && (
          <>
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
                    <img src={game.background_image} alt={game.name} style={styles.gameImage} />
                    <div style={styles.cardContent}>
                      <div style={styles.platformIcons}>
                        {uniquePlatforms.map((key) => (
                          <img key={key} src={platformImages[key]} alt={key} style={{ width: 22, height: 22 }} />
                        ))}
                      </div>
                      <div style={styles.gameTitle}>{game.name}</div>
                    </div>
                    <button
                      style={{
                        ...styles.addButton,
                        textShadow: hoveredAddBtn === game.id ? "0 0 12px #fff, 0 0 8px #fff" : "none",
                        color: hoveredAddBtn === game.id ? "#3b82f6" : "#fff",
                        transform: hoveredAddBtn === game.id ? "scale(1.1)" : "scale(1)"
                      }}
                      onClick={() => handleAddGame(game)}
                      onMouseOver={() => setHoveredAddBtn(game.id)}
                      onMouseOut={() => setHoveredAddBtn(null)}
                      title="Adicionar à biblioteca"
                      aria-label={`Adicionar o jogo ${game.name} à biblioteca`}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>

            {!loading && (
              <button onClick={handleLoadMore} style={styles.loadMoreButton}>
                Carregar mais
              </button>
            )}

            {loading && (
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <div style={styles.loadingSpinner}></div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListGames;