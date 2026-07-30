import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { speakGreeting, playSoundEffect } from '../utils/audio';

export default function SingAlong() {
  const [isPlaying, setIsPlaying] = useState(false);

  const songLyrics = [
    '개굴개굴~ 개구쟁이 꼬마버스 타요!',
    '달리고 달리는~ 신나는 꼬마버스!',
    '타요! 타요! 꼬마버스 타요!',
    '개구쟁이 꼬마버스 타요! 🚌'
  ];

  const handlePlaySong = () => {
    setIsPlaying(true);
    playSoundEffect('correct_fanfare');
    speakGreeting('개굴개굴! 개구쟁이 꼬마버스 타요! 달리고 달리는 신나는 꼬마버스! 타요! 타요! 꼬마버스 타요!');

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      setIsPlaying(false);
    }, 8000);
  };

  return (
    <div className="singalong-card">
      <h2 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
        🎵 꼬마버스 타요 주제가 씽어롱 🎵
      </h2>
      <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.6rem', color: '#93c5fd' }}>
        신나게 노래를 부르며 춤추는 타요를 만나요!
      </p>

      {/* Dancing Bus Graphic */}
      <img
        src="/assets/tayo.png"
        alt="Dancing Tayo"
        className="dancing-tayo-img"
      />

      <div style={{ margin: '1.5rem 0' }}>
        <button
          className="tab-btn"
          onClick={handlePlaySong}
          style={{
            margin: '0 auto',
            fontSize: '1.5rem',
            padding: '1rem 2.5rem',
            background: '#f59e0b',
            color: 'white',
            borderColor: '#ffffff'
          }}
        >
          <span>{isPlaying ? '🎶 신나게 노래 부르는 중...' : '▶️ 주제가 틀어줘!'}</span>
        </button>
      </div>

      <div className="lyrics-box">
        {songLyrics.map((line, idx) => (
          <p key={idx} style={{ margin: '0.6rem 0' }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
