import React from 'react';
import Header from '../components/Header';

function Home() {
  const homeStyle = {
    textAlign: 'center',
    margin: '0', 
    height: '100vh', 
    backgroundColor: '#1A1A1A',
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div>
      <Header />
      <main style={homeStyle}>
        <h1>Welcome to GameDex</h1>
        <p>Your ultimate gaming companion!</p>
      </main>
    </div>
  );
}

export default Home;