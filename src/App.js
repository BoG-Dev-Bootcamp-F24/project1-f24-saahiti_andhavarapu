import React, { useState, useEffect } from 'react';
import './App.css';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState(132);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching the Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!pokemon) {
    return <div className="error">Error loading Pokémon data.</div>;
  }

  const handlePrevClick = () => {
    if (currentId > 1) {
      setCurrentId(currentId - 1);
    }
  };

  const handleNextClick = () => {
    if (currentId < 898) {
      setCurrentId(currentId + 1);
    }
  };

  return (
    <div className="container">
      <h1>Bits of Good Mid-Semester Project</h1>
      <div className="main-content">
        <div className="left-section">
          <div className="pokemon-image">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <div className="pokemon-name-container">
            <div className="pokemon-name">{pokemon.name}</div>
          </div>
          <div className="pokemon-types">
            {pokemon.types.map((typeInfo, index) => (
              <span 
                key={index} 
                className="type" 
                style={{ backgroundColor: typeColors[typeInfo.type.name] }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrevClick}>{'<'}</button>
            <button onClick={handleNextClick}>{'>'}</button>
          </div>
        </div>

        <div className="right-section">
          {showInfo ? (
            <div className="pokemon-stats">
              <h3>Stats</h3>
              <p>Height: {pokemon.height / 10} m</p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              {pokemon.stats.map((stat, index) => (
                <p key={index}>
                  {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                </p>
              ))}
            </div>
          ) : (
            <div className="pokemon-moves">
              <h3>Moves:</h3>
              {pokemon.moves.map((moveInfo, index) => (
                <p key={index}>{moveInfo.move.name}</p>
              ))}
            </div>
          )}

          <div className="info-header">
            <button 
              className={`tab-button ${showInfo ? 'active' : ''}`} 
              onClick={() => setShowInfo(true)}
            >
              Stats
            </button>
            <button 
              className={`tab-button ${!showInfo ? 'active' : ''}`} 
              onClick={() => setShowInfo(false)}
            >
              Moves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
