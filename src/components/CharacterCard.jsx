import React, { useState } from 'react';
import { speakGreeting, playSoundEffect } from '../utils/audio';

export default function CharacterCard({ character, onSelectCard }) {
  const [imgError, setImgError] = useState(false);

  const handleSpeak = (e) => {
    e.stopPropagation();
    speakGreeting(character.greeting);
  };

  const handleSound = (e) => {
    e.stopPropagation();
    playSoundEffect(character.soundType);
  };

  return (
    <div className="character-card" onClick={() => onSelectCard(character)}>
      {/* Top right color / badge tag */}
      <div className="card-badge-tag">
        <span style={{ color: character.color }}>●</span>
        <span>{character.colorName}</span>
      </div>

      {/* Image or Fallback Visual */}
      <div className="card-image-wrapper">
        {!imgError ? (
          <img
            src={character.image}
            alt={character.name}
            className="card-image"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card-fallback-icon">{character.badge}</div>
        )}
      </div>

      {/* Info Header */}
      <div className="card-info">
        <div className="card-name-row">
          <h3 className="card-name">{character.name}</h3>
          {character.number && (
            <span className="card-number" style={{ backgroundColor: character.color }}>
              {character.number}
            </span>
          )}
        </div>
        <p className="card-type">{character.vehicleType}</p>
        <p className="card-catchphrase">"{character.catchphrase}"</p>

        {/* Buttons */}
        <div className="card-actions">
          <button className="action-btn btn-speak" onClick={handleSpeak}>
            <span>🗣️</span>
            <span>인사 들을래</span>
          </button>
          <button className="action-btn btn-sound" onClick={handleSound}>
            <span>🔊</span>
            <span>소리 빵빵!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
