import React, { useEffect, useState } from "react";
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

function MyGames() {
  const { user, token } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#1a1a1a",
      color: "white",
      maxWidth: "1500px",
      margin: "0 auto",
      marginTop: "10px",
      boxSizing: "border-box",
      overflowX: "hidden",
    },
    gamesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
    },
    gameCard: {
      backgroundColor: "#2a2a2a",
      borderRadius: "10px",
      overflow: "hidden",
      textAlign: "left",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "100%",
      height: "250px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    gameImage: {
      width: "100%",
      height: "150px",
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
      fontSize: "16px",
      fontWeight: "bold",
      margin: "0",
      color: "#fff",
      textAlign: "left",
      lineHeight: "1.2",
      wordBreak: "break-word",
    },
  };

  return (
    
    <div style={styles.container}>
      <h2>Meus Jogos</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "#ff4d4f" }}>{error}</p>}
      {!loading && games.length === 0 && (
        <div style={{ color: "#ff4d4f", textAlign: "center", marginTop: "40px", fontSize: "1.2rem", fontWeight: "bold" }}>
          Você ainda não adicionou jogos.
        </div>
      )}
      {games.length > 0 && (
      <div style={styles.gamesGrid}>
        {games.map((game) => {
          // Converte a string de plataformas em array e remove duplicados
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
            <div key={game.id} style={styles.gameCard}>
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
    </div>
  );
}

export default MyGames;