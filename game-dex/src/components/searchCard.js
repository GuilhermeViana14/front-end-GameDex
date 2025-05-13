import React from "react";
import { FaUserCircle, FaCalendarAlt, FaGamepad, FaLayerGroup, FaLaptopCode, FaTrophy, FaChartBar, FaCrown } from "react-icons/fa";

const SearchCard = () => (
  <aside style={{
    width: "240px",
    background: "#232323",
    color: "#fff",
    borderRadius: "16px",
    padding: "32px 20px",
    fontFamily: "sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    position: "absolute",
    left: "24px",
    top: "150px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
    zIndex: 100
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "12px" }}>
      <FaUserCircle size={54} /> {/* ícone maior */}
      <div>
        <div style={{ fontSize: "19px" }}>
          <span style={{ marginRight: "18px", cursor: "pointer" }}>Login</span>
          <span style={{ cursor: "pointer" }}>Cadastro</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: "16px", marginTop: "6px", color: "#ccc" }}>
          <FaCalendarAlt size={18} style={{ marginRight: "7px" }} />
          My libery
        </div>
      </div>
    </div>
    <hr style={{ border: "none", borderTop: "1px solid #444", margin: "10px 0" }} />
    <div style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "4px" }}>Search list</div>
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}>
        <FaGamepad size={22} /> Plataformas
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}>
        <FaLayerGroup size={22} /> Gênero
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}>
        <FaLaptopCode size={22} /> desenvolvedor
      </div>
    </div>
    <div style={{ fontWeight: "bold", fontSize: "20px", margin: "18px 0 4px 0" }}>Top</div>
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}>
        <FaTrophy size={22} /> Melhor do ano
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}>
        <FaChartBar size={22} /> Populares de 2024
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}>
        <FaCrown size={22} /> melhores de sempre
      </div>
    </div>
    <hr style={{ border: "none", borderTop: "1px solid #444", margin: "10px 0" }} />
    <div style={{ fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}>Todos os jogos</div>
  </aside>
);

export default SearchCard;