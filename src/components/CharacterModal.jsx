import React, { useEffect, useState } from 'react';
import { speakGreeting, playSoundEffect } from '../utils/audio';

export default function CharacterModal({ character, onClose }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (character) {
      speakGreeting(character.greeting);
    }
  }, [character]);

  if (!character) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-body">
          {/* Badge */}
          <span className="quiz-score-badge" style={{ background: character.color, color: '#fff' }}>
            {character.badge} {character.name} {character.number ? `(${character.number})` : ''}
          </span>

          {/* Image */}
          {!imgError ? (
            <img
              src={character.image}
              alt={character.name}
              className="modal-image"
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ fontSize: '6rem', margin: '1rem' }}>{character.badge}</div>
          )}

          {/* Speech Bubble */}
          <div className="speech-bubble">
            "{character.greeting}"
          </div>

          <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '1.5rem' }}>
            ✨ {character.quizHint}
          </p>

          {/* Large Action Buttons */}
          <div className="card-actions" style={{ maxWidth: '400px', width: '100%' }}>
            <button
              className="action-btn btn-speak"
              style={{ fontSize: '1.2rem', padding: '0.8rem' }}
              onClick={() => speakGreeting(character.greeting)}
            >
              <span>🗣️ 목소리 다시 듣기</span>
            </button>
            <button
              className="action-btn btn-sound"
              style={{ fontSize: '1.2rem', padding: '0.8rem' }}
              onClick={() => playSoundEffect(character.soundType)}
            >
              <span>🔊 경적 소리 빵빵!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
