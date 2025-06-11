import React , { useState }  from "react";
import ListGames from '../components/list_games';

function Home({ searchTerm, setSearchTerm, searchResults, setSearchResults, loadingSearch  }) {
  
   const homeStyle = {
    textAlign: 'left',
    margin: '0',  
    backgroundColor: '#1A1A1A',
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
      <main style={homeStyle}>
        <h1
          style={{
            alignSelf: 'flex-start',
            marginBottom: 0,
            marginLeft: "350px",
            fontWeight: "bold",
            fontSize: "3.5rem"
          }}
        >
          Bem vindo ao GameDex
        </h1>
        <h2
          style={{
            alignSelf: 'flex-start',
            marginTop: 8,
            marginLeft: "350px",
            fontWeight: "normal",
            fontSize: "1.3rem"
          }}
        >
          Sua biblioteca de jogos
        </h2>
       <ListGames
          searchTerm={searchTerm}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          loadingSearch={loadingSearch} 
          
        />
      </main>
    </div>
  );
}

export default Home;