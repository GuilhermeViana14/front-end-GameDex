import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCalendarAlt, FaGamepad, FaLayerGroup, FaLaptopCode, FaTrophy, FaChartBar, FaCrown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";

const plataformas = [
  { name: "PC", icon: "/platform-icons/icons8-pc-50.png" },
  { name: "PlayStation", icon: "/platform-icons/icons8-playstation-50.png" },
  { name: "Xbox", icon: "/platform-icons/icons8-xbox-50.png" },
  { name: "Nintendo Switch", icon: "/platform-icons/icons8-nintendo-switch-handheld-50.png" },
  { name: "Android", icon: "/platform-icons/icons8-android-50.png" },
  { name: "iOS", icon: "/platform-icons/icons8-ios-50.png" }
];

const generos = [
  { name: "Ação", icon: "/genre-icons/icons8-action-50.png" },
  { name: "Aventura", icon: "/genre-icons/icons8-adventure-50.png" },
  { name: "RPG", icon: "/genre-icons/icons8-rpg-game-64 (1).png" },
  { name: "Esporte", icon: "/genre-icons/icons8-sport-50.png" },
  { name: "Estratégia", icon: "/genre-icons/icons8-strategy-50.png" }
];

const desenvolvedores = [
  { name: "Nintendo", icon: "/dev-icons/icons8-nintendo-50 (1).png" },
  { name: "Sony", icon: "/dev-icons/icons8-playstation-24.png" },
  { name: "Microsoft", icon: "/dev-icons/icons8-microsoft-50.png" },
  { name: "Rockstar", icon: "/dev-icons/icons8-rockstar-48 (1).png" },
  { name: "Ubisoft", icon: "/dev-icons/icons8-ubisoft-32.png" }
];

const customCheckboxStyle = {
  width: 18,
  height: 18,
  border: "2px solid #fff",
  borderRadius: "4px",
  background: "transparent",
  appearance: "none",
  outline: "none",
  cursor: "pointer",
  transition: "background 0.2s",
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const checkedCheckboxStyle = {
  ...customCheckboxStyle,
  background: "#fff",
};

const SearchCard = ({
  checkedPlataformas, setCheckedPlataformas,
  checkedGeneros, setCheckedGeneros,
  checkedDevs, setCheckedDevs,
  onFilterChange
}) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Plataformas
  const [showPlataformas, setShowPlataformas] = useState(false);
  const contentRefPlataformas = useRef(null);
  const [maxHeightPlataformas, setMaxHeightPlataformas] = useState("0px");
  // REMOVA esta linha:
  // const [checkedPlataformas, setCheckedPlataformas] = useState([]);

  // Gêneros
  const [showGeneros, setShowGeneros] = useState(false);
  const contentRefGeneros = useRef(null);
  const [maxHeightGeneros, setMaxHeightGeneros] = useState("0px");
  // REMOVA esta linha:
  // const [checkedGeneros, setCheckedGeneros] = useState([]);

  // Desenvolvedores
  const [showDevs, setShowDevs] = useState(false);
  const contentRefDevs = useRef(null);
  const [maxHeightDevs, setMaxHeightDevs] = useState("0px");

  // Top hover animation
  const [hoveredTop, setHoveredTop] = useState(null);

  // Hover para My Library
  const [hoveredLibrary, setHoveredLibrary] = useState(false);

  // Chama callback sempre que filtros mudam
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        plataformas: checkedPlataformas,
        generos: checkedGeneros,
        devs: checkedDevs
      });
    }
  }, [checkedPlataformas, checkedGeneros, checkedDevs, onFilterChange]);

  useEffect(() => {
    if (showPlataformas && contentRefPlataformas.current) {
      setMaxHeightPlataformas(contentRefPlataformas.current.scrollHeight + "px");
    } else {
      setMaxHeightPlataformas("0px");
    }
  }, [showPlataformas]);

  useEffect(() => {
    if (showGeneros && contentRefGeneros.current) {
      setMaxHeightGeneros(contentRefGeneros.current.scrollHeight + "px");
    } else {
      setMaxHeightGeneros("0px");
    }
  }, [showGeneros]);

  useEffect(() => {
    if (showDevs && contentRefDevs.current) {
      setMaxHeightDevs(contentRefDevs.current.scrollHeight + "px");
    } else {
      setMaxHeightDevs("0px");
    }
  }, [showDevs]);

  const handleCheck = (name, checkedList, setCheckedList) => {
    setCheckedList((prev) =>
      prev.includes(name)
        ? prev.filter((p) => p !== name)
        : [...prev, name]
    );
  };

  return (
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
      left: "5px",
      top: "150px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "12px" }}>
        <FaUserCircle size={54} />
        <div>
          {user ? (
            <>
              <div style={{ fontSize: "19px", color: "#fff", fontWeight: "bold" }}>
                {user.nome || user.first_name || user.email}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  marginTop: "6px",
                  color: "#ccc",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  transform: hoveredLibrary ? "scale(1.1)" : "scale(1)"
                }}
                onClick={() => navigate("/meus-jogos")}
                onMouseEnter={() => setHoveredLibrary(true)}
                onMouseLeave={() => setHoveredLibrary(false)}
              >
                <FaCalendarAlt size={18} style={{ marginRight: "7px" }} />
                My Library
              </div>
            </>
          ) : (
            <div style={{ fontSize: "19px" }}>
              <span
                style={{ marginRight: "18px", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/cadastro")}
              >
                Cadastro
              </span>
            </div>
          )}
        </div>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #444", margin: "10px 0" }} />
      <div style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "4px" }}>Search list</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {/* Plataformas */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}
          onClick={() => setShowPlataformas((v) => !v)}
        >
          <FaGamepad size={22} /> Plataformas
          {showPlataformas ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </div>
        <div
          ref={contentRefPlataformas}
          style={{
            maxHeight: maxHeightPlataformas,
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            marginLeft: "38px",
            marginTop: showPlataformas ? "6px" : "0",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          {plataformas.map((plat) => (
            <label
              key={plat.name}
              style={{
                cursor: "pointer",
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                userSelect: "none"
              }}
            >
              <img src={plat.icon} alt={plat.name} style={{ width: 22, height: 22 }} />
              <span>{plat.name}</span>
              <input
                type="checkbox"
                checked={checkedPlataformas.includes(plat.name)}
                onChange={() => handleCheck(plat.name, checkedPlataformas, setCheckedPlataformas)}
                style={
                  checkedPlataformas.includes(plat.name)
                    ? checkedCheckboxStyle
                    : customCheckboxStyle
                }
              />
            </label>
          ))}
        </div>
        {/* Gêneros */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}
          onClick={() => setShowGeneros((v) => !v)}
        >
          <FaLayerGroup size={22} /> Gênero
          {showGeneros ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </div>
        <div
          ref={contentRefGeneros}
          style={{
            maxHeight: maxHeightGeneros,
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            marginLeft: "38px",
            marginTop: showGeneros ? "6px" : "0",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          {generos.map((gen) => (
            <label
              key={gen.name}
              style={{
                cursor: "pointer",
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                userSelect: "none"
              }}
            >
              <img src={gen.icon} alt={gen.name} style={{ width: 22, height: 22 }} />
              <span>{gen.name}</span>
              <input
                type="checkbox"
                checked={checkedGeneros.includes(gen.name)}
                onChange={() => handleCheck(gen.name, checkedGeneros, setCheckedGeneros)}
                style={
                  checkedGeneros.includes(gen.name)
                    ? checkedCheckboxStyle
                    : customCheckboxStyle
                }
              />
            </label>
          ))}
        </div>
        {/* Desenvolvedores */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", fontSize: "18px" }}
          onClick={() => setShowDevs((v) => !v)}
        >
          <FaLaptopCode size={22} /> Desenvolvedor
          {showDevs ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </div>
        <div
          ref={contentRefDevs}
          style={{
            maxHeight: maxHeightDevs,
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            marginLeft: "38px",
            marginTop: showDevs ? "6px" : "0",
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}
        >
          {desenvolvedores.map((dev) => (
            <label
              key={dev.name}
              style={{
                cursor: "pointer",
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                userSelect: "none"
              }}
            >
              <img src={dev.icon} alt={dev.name} style={{ width: 22, height: 22 }} />
              <span>{dev.name}</span>
              <input
                type="checkbox"
                checked={checkedDevs.includes(dev.name)}
                onChange={() => handleCheck(dev.name, checkedDevs, setCheckedDevs)}
                style={
                  checkedDevs.includes(dev.name)
                    ? checkedCheckboxStyle
                    : customCheckboxStyle
                }
              />
            </label>
          ))}
        </div>
      </div>
      <div style={{ fontWeight: "bold", fontSize: "20px", margin: "18px 0 4px 0" }}>Top</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            cursor: "pointer",
            fontSize: "18px",
            transition: "transform 0.2s",
            transform: hoveredTop === "ano" ? "scale(1.1)" : "scale(1)"
          }}
          onMouseEnter={() => setHoveredTop("ano")}
          onMouseLeave={() => setHoveredTop(null)}
        >
          <FaTrophy size={22} /> Melhor do ano
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            cursor: "pointer",
            fontSize: "18px",
            transition: "transform 0.2s",
            transform: hoveredTop === "pop" ? "scale(1.1)" : "scale(1)"
          }}
          onMouseEnter={() => setHoveredTop("pop")}
          onMouseLeave={() => setHoveredTop(null)}
        >
          <FaChartBar size={22} /> Populares de 2024
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            cursor: "pointer",
            fontSize: "18px",
            transition: "transform 0.2s",
            transform: hoveredTop === "sempre" ? "scale(1.1)" : "scale(1)"
          }}
          onMouseEnter={() => setHoveredTop("sempre")}
          onMouseLeave={() => setHoveredTop(null)}
        >
          <FaCrown size={22} /> melhores de sempre
        </div>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #444", margin: "10px 0" }} />
      <div style={{ fontWeight: "bold", fontSize: "20px", cursor: "pointer" }}>Todos os jogos</div>
    </aside>
  );
};

export default SearchCard;