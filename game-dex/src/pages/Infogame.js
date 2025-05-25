import React from "react";
import { useAuth } from "../components/AuthContext";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/searchCard";
import { FaSearch } from "react-icons/fa";

function Infogame() {
  const { user } = useAuth();
  const location = useLocation();
  const game = location.state?.game; // Obtém os detalhes do jogo clicado
  console.log(game);

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
    gameDetails: {
      backgroundColor: "#1f1f1f",
      borderRadius: "10px",
      padding: "20px",
      display: "flex",
      flexDirection: "row-reverse", // Move a imagem para a direita
      gap: "20px",
      marginBottom: "20px",
    },
    gameImage: {
      width: "600px",
      height: "300px",
      borderRadius: "10px",
      objectFit: "cover",
    },
    gameInfo: {
      flex: 1,
    },
    gameTitle: {
      fontSize: "1.8rem",
      marginBottom: "10px",
    },
    gameText: {
      marginBottom: "5px",
      color: "#ccc",
    },
    platformIcons: {
      display: "flex",
      gap: "8px",
      marginTop: "10px",
    },
    commentSection: {
      backgroundColor: "#1f1f1f",
      borderRadius: "10px",
      padding: "20px",
    },
    commentTitle: {
      fontSize: "1.5rem",
      marginBottom: "10px",
    },
    commentText: {
      color: "#ccc",
      lineHeight: "1.5",
    },
  };

  return (
    <>
      <div>
        <SearchCard />
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
            style={styles.searchInput}
          />
        </div>

        {/* Detalhes do jogo */}
        {game && (
          <>
            <div style={styles.gameDetails}>
              <img
                src={game.background_img || "https://via.placeholder.com/200"}
                alt={game.name || "Imagem do jogo"}
                style={styles.gameImage}
              />
              <div style={styles.gameInfo}>
                <h3 style={styles.gameTitle}>{game.name}</h3>

                {/* Exibir plataformas */}
                <div style={styles.platformIcons}>
                  <span style={{ marginRight: "8px", color: "#ccc" }}>
                    Plataformas:
                  </span>
                  {(() => {
                    const platformsArray = game.platforms
                      ? game.platforms.split(",").map((p) => p.trim())
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

                    return uniquePlatforms.map((platform, index) => (
                      <img
                        key={index}
                        src={platformImages[platform]}
                        alt={platform}
                        style={{ width: "32px", height: "32px" }}
                      />
                    ));
                  })()}
                </div>

                {/* Exibir a data de lançamento */}
                <p style={styles.gameText}>
                  Data de lançamento:{" "}
                  {game.release_date
                    ? new Date(`${game.release_date}T00:00:00Z`).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    : "Desconhecida"}
                </p>

                {/* Exibir progresso */}
                <p style={styles.gameText}>
                  Progresso: {game.progress || "Nenhum progresso registrado"}
                </p>

                {/* Exibir rating */}
                <p style={styles.gameText}>
                  Avaliação: {game.rating ? `${game.rating}/100` : "Sem avaliação"}
                </p>
              </div>
            </div>

            {/* Comentário */}
            <div style={styles.commentSection}>
              <h3 style={styles.commentTitle}>Comentário</h3>
              <p style={styles.commentText}>
                {game.comment ||
                  "Nenhum comentário disponível para este jogo."}
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Infogame;