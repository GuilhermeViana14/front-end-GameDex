import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { AuthProvider } from './components/AuthContext';
import MyGames from './pages/Mygames';
import Infogame from './pages/Infogame';
import Header from './components/Header';
import ConfirmacaoCadastro from './pages/confirmacao_cadastro';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false); 
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/cadastro"|| location.pathname === "/confirmacao-cadastro";


  return (
    <>
     {!hideHeader && (
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchResults={setSearchResults}
          onLoading={setLoadingSearch}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              onLoading={setLoadingSearch}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/meus-jogos" element={<MyGames />} />
        <Route path="/infogame" element={<Infogame />} />
        <Route path="/confirmacao-cadastro" element={<ConfirmacaoCadastro />} />
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