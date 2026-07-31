import React from 'react';
import { speakGreeting, playSoundEffect } from '../utils/audio';
import TayoCharacterAvatar from './TayoCharacterAvatar';

export default function CharacterCard({ character, onSelectCard }) {
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

      {/* Image / Hybrid Visual Avatar */}
      <div className="card-image-wrapper">
        <TayoCharacterAvatar character={character} className="card-image" />
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
