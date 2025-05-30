import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import { AuthProvider } from './components/AuthContext';
import MyGames from './pages/Mygames';
import Infogame from './pages/Infogame';
import Header from './components/Header';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false); 
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/cadastro" || location.pathname === "/forgotpassword" || location.pathname === "/reset-password";

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
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/meus-jogos" element={<MyGames />} />
        <Route path="/infogame" element={<Infogame />} />
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