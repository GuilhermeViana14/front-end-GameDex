import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import SearchCard from "../components/searchCard";
import { FaSearch } from "react-icons/fa";


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
  
const getGridColumns = () => {
    return "repeat(4, 1fr)";
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

function MyGames() {
  const { user, token } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  const [checkedPlataformas, setCheckedPlataformas] = useState([]);
  const [checkedGeneros, setCheckedGeneros] = useState([]);
  const [checkedDevs, setCheckedDevs] = useState([]);


  const getGridColumns = () => {
    return "repeat(4, 1fr)";
  };
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/users/${user.id}/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar jogos do usuário");
        return res.json();
      })
      .then((data) => setGames(data.games))
      .catch(() => setError("Erro ao carregar seus jogos."))
      .finally(() => setLoading(false));
  }, [user, token]);

  // Filtro de busca na biblioteca pessoal
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    content: {
      flex: 1,
      padding: "40px 40px 0 0",
      marginLeft: "320px",
      minHeight: "100vh",
      color: "white",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      marginTop: "0",
    },
    userName: {
      fontSize: "1.3rem",
      fontWeight: "normal",
      marginBottom: "2.2rem",
      color: "#ccc",
    },
    searchBar: {
      width: "60%",
      maxWidth: "600px",
      marginBottom: "32px",
      background: "#444",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      padding: "0 18px",
      height: "38px",
    },
    searchInput: {
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#fff",
      fontSize: "1.1rem",
      width: "100%",
      marginLeft: "10px",
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
      fontSize: "1.1rem",
      fontWeight: "bold",
      margin: "0",
      color: "#fff",
      textAlign: "left",
      lineHeight: "1.2",
      wordBreak: "break-word",
    },
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
        />
      </div>
      <main style={styles.content}>
        <h2 style={styles.title}>My library</h2>
        <div style={styles.userName}>
          {user && (user.nome || user.first_name || user.email)}
        </div>
        <div style={styles.searchBar}>
          <FaSearch color="#bbb" />
          <input
            type="text"
            placeholder="Search my library"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "#ff4d4f" }}>{error}</p>}
        {!loading && filteredGames.length === 0 && (
          <div style={{ color: "#ff4d4f", textAlign: "center", marginTop: "40px", fontSize: "1.2rem", fontWeight: "bold" }}>
            Você ainda não adicionou jogos.
          </div>
        )}
        {filteredGames.length > 0 && (
          <div style={styles.gamesGrid}>
            {filteredGames.map((game) => {
              // Remove plataformas duplicadas
              const platformsArray = game.platforms
                ? game.platforms.split(',').map(p => p.trim())
                : [];
              const uniquePlatforms = [];
              const seen = new Set();
              platformsArray.forEach((key) => {
                const platformKey = getPlatformKey(key);
                if (!seen.has(platformKey)) {
                  seen.add(platformKey);
                  uniquePlatforms.push(platformKey);
                }
              });

              return (
                <div
                  key={game.id}
                  style={styles.gameCard(hoveredCard === game.id)}
                  onMouseEnter={() => setHoveredCard(game.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <img src={game.background_img} alt={game.name} style={styles.gameImage} />
                  <div style={styles.cardContent}>
                    <div style={styles.platformIcons}>
                      {uniquePlatforms.map((key) => (
                        <img
                          key={key}
                          src={platformImages[key]}
                          alt={key}
                          style={{ width: 22, height: 22 }}
                        />
                      ))}
                    </div>
                    <div style={styles.gameTitle}>{game.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

export default MyGames;