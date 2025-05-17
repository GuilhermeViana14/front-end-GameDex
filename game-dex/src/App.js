import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { AuthProvider } from './components/AuthContext';
import MyGames from './pages/Mygames';
import Header from './components/Header';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // Não mostrar Header nas rotas de login e cadastro
  const hideHeader = location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <>
      {!hideHeader && <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/meus-jogos" element={<MyGames />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;