import React from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import SearchCard from "../components/searchCard";
import { FaSearch } from "react-icons/fa";
import { fetchUserGameDetail, updateUserGame, removeUserGame } from "../service/gameService";

function Infogame() {
  const { user } = useAuth();
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = React.useState(false);
  const [gameData, setGameData] = React.useState(null);
  const [status, setStatus] = React.useState("Jogando");
  const [progress, setProgress] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [comment, setComment] = React.useState("");

  const backendToFrontendStatus = {
    jogando: "Jogando",
    jogado: "Jogado",
    dropado: "Dropado",
  };
  const frontendToBackendStatus = {
    "Jogando": "jogando",
    "Jogado": "jogado",
    "Dropado": "dropado",
  };

  // Busca os dados do jogo ao abrir a tela
  React.useEffect(() => {
    async function loadGame() {
      const data = await fetchUserGameDetail({ userId: user.id, gameId });
      setGameData(data.game);
      setStatus(backendToFrontendStatus[data.status] || "Jogando");
      setProgress(data.progress || "");
      setRating(data.rating || "");
      setComment(data.comment || "");
    }
    if (user && gameId) loadGame();
  }, [user, gameId]);

  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleSave = async () => {
    try {
      await updateUserGame({
        userId: user.id,
        gameId,
        comment,
        rating,
        progress,
        status: frontendToBackendStatus[status] || "jogando",
      });
      setIsEditing(false);
      // Recarrega os dados atualizados do backend
      const data = await fetchUserGameDetail({ userId: user.id, gameId });
      setGameData(data.game);
      setStatus(backendToFrontendStatus[data.status] || "Jogando");
      setProgress(data.progress || "");
      setRating(data.rating || "");
      setComment(data.comment || "");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeUserGame({
        userId: user.id,
        gameId,
      });
      navigate("/meus-jogos");
    } catch (error) {
      console.error("Erro ao remover jogo:", error);
    }
  };

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
      flexDirection: "row-reverse",
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
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    gameTitleRow: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    gameTitle: {
      fontSize: "1.8rem",
      marginBottom: 0,
      marginRight: "12px",
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
      marginBottom: "20px",
      position: "relative",
    },
    commentTitle: {
      fontSize: "1.5rem",
      marginBottom: "10px",
    },
    commentText: {
      color: "#ccc",
      lineHeight: "1.5",
    },
    editBtn: {
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      fontSize: "1.1rem",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: 0,
      outline: "none",
      transition: "color 0.2s",
      marginLeft: "8px",
    },
    saveBtn: {
      color: "#fff",
      background: "#2d2d2d",
      border: "none",
      borderRadius: "6px",
      padding: "6px 18px",
      fontWeight: 500,
      fontSize: "1rem",
      cursor: "pointer",
      marginRight: "12px",
      marginTop: "12px",
    },
    cancelBtn: {
      color: "#bbb",
      background: "#222",
      border: "none",
      borderRadius: "6px",
      padding: "6px 18px",
      fontWeight: 500,
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "12px",
    },
    inputEditing: {
      backgroundColor: "#2d2d2d",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "8px",
      marginBottom: "10px",
    },
    statusSelect: {
      backgroundColor: "#2d2d2d",
      color: "#FFD700",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "8px",
      marginBottom: "10px",
      marginTop: "10px",
      width: "180px",
    },
  };

  return (
    <>
      <div>
        <SearchCard
          checkedPlataformas={[]}
          setCheckedPlataformas={() => {}}
          checkedGeneros={[]}
          setCheckedGeneros={() => {}}
          checkedDevs={[]}
          setCheckedDevs={() => {}}
          onShowAllGames={() => {}}
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
            style={styles.searchInput}
          />
        </div>

        {/* Detalhes do jogo */}
        {gameData && (
          <>
            <div style={{ ...styles.gameDetails }}>
              <img
                src={gameData.background_img || "https://via.placeholder.com/200"}
                alt={gameData.name || "Imagem do jogo"}
                style={styles.gameImage}
              />
              <div style={styles.gameInfo}>
                <div style={styles.gameTitleRow}>
                  <h3 style={styles.gameTitle}>{gameData.name}</h3>
                  {!isEditing && (
                    <button
                      style={styles.editBtn}
                      onClick={() => setIsEditing(true)}
                      title="Editar"
                    >
                      <img
                        src="/icons/icons8-edit-50 3.png"
                        alt="Editar"
                        style={{ width: "22px", height: "22px" }}
                      />
                      <span style={{ fontWeight: 400, fontSize: "1.1rem" }}>
                        edit
                      </span>
                    </button>
                  )}
                </div>

                {/* Exibir plataformas */}
                <div style={styles.platformIcons}>
                  <span style={{ marginRight: "8px", color: "#ccc" }}>
                    Plataformas:
                  </span>
                  {(() => {
                    const platformsArray = gameData.platforms
                      ? gameData.platforms.split(",").map((p) => p.trim())
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
                  {gameData.release_date
                    ? new Date(`${gameData.release_date}T00:00:00Z`).toLocaleDateString(
                        "pt-BR",
                        { timeZone: "UTC" }
                      )
                    : "Desconhecida"}
                </p>

                {/* Exibir status */}
                <div>
                  <label style={{ marginRight: "8px" }}>Status:</label>
                  {isEditing ? (
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      style={styles.statusSelect}
                    >
                      <option value="Jogando">Jogando</option>
                      <option value="Jogado">Jogado</option>
                      <option value="Dropado">Dropado</option>
                    </select>
                  ) : (
                    <span style={{ color: "#FFD700", fontWeight: "bold" }}>{status}</span>
                  )}
                </div>

                {/* Exibir progresso */}
                {isEditing ? (
                  <input
                    type="text"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                    placeholder="Progresso"
                    style={styles.inputEditing}
                  />
                ) : (
                  <p style={styles.gameText}>
                    Progresso: {progress || "Nenhum progresso registrado"}
                  </p>
                )}

                {/* Exibir rating */}
                {isEditing ? (
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Avaliação"
                    style={styles.inputEditing}
                  />
                ) : (
                  <p style={styles.gameText}>
                    Avaliação: {rating ? `${rating}/100` : "Sem avaliação"}
                  </p>
                )}
              </div>
            </div>

            {/* Comentário */}
            <div style={styles.commentSection}>
              {isEditing ? (
                <>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comentário"
                    style={{
                      ...styles.inputEditing,
                      minHeight: "80px",
                    }}
                  />
                  <div>
                    <button
                      style={styles.saveBtn}
                      onClick={handleSave}
                      title="Salvar"
                    >
                      Salvar
                    </button>
                    <button
                      style={styles.cancelBtn}
                      onClick={() => setIsEditing(false)}
                      title="Cancelar edição"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <p style={styles.commentText}>
                  {comment || "Nenhum comentário disponível para este jogo."}
                </p>
              )}
            </div>
            <button
              style={{
                color: "#fff",
                background: "#d9534f",
                border: "none",
                borderRadius: "6px",
                padding: "6px 18px",
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: "12px",
              }}
              onClick={handleRemove}
              title="Remover jogo"
            >
              Deletar
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default Infogame;