import React from 'react';
import { playSoundEffect, speakGreeting } from '../utils/audio';

export default function SoundBoard() {
  const soundItems = [
    { title: '타요 경적', icon: '🚌', sound: 'horn', color: '#1E60D5', tts: '빵빵! 타요 버스 출발합니다!' },
    { title: '소방차 사이렌', icon: '🚒', sound: 'siren_fire', color: '#DC3545', tts: '삐뽀삐뽀! 불을 끄러 출동!' },
    { title: '경찰차 사이렌', icon: '🚓', sound: 'siren_police', color: '#0D6EFD', tts: '삐뽀삐뽀! 도로 안전을 지킵니다!' },
    { title: '구급차 사이렌', icon: '🚑', sound: 'siren_ambulance', color: '#E83E8C', tts: '삐뽀삐뽀! 아픈 친구를 도와줘요!' },
    { title: '헬리콥터', icon: '🚁', sound: 'helicopter', color: '#E63946', tts: '푸다다닥! 하늘을 납니다!' },
    { title: '굴착기 포코', icon: '🏗️', sound: 'excavator', color: '#FFC107', tts: '영차! 흙을 파내는 포코야!' },
    { title: '스포츠카', icon: '🏎️', sound: 'sports_car', color: '#DC3545', tts: '부르릉! 제일 빠른 스피드!' },
    { title: '귀여운 경적', icon: '🩷', sound: 'horn_high', color: '#E83E8C', tts: '뛰뛰! 귀여운 하트야!' },
    { title: '축하 팡파레', icon: '🎉', sound: 'correct_fanfare', color: '#10B981', tts: '와아! 참 잘했어요!' }
  ];

  const handlePlay = (item) => {
    playSoundEffect(item.sound);
    speakGreeting(item.tts);
  };

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.2rem', color: '#1e293b', marginBottom: '0.5rem' }}>
          📢 빵빵! 자동차 소리 놀이터
        </h2>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.5rem', color: '#475569' }}>
          버튼을 누르면 진짜 자동차 소리와 목소리가 나와요!
        </p>
      </div>

      <div className="soundboard-grid">
        {soundItems.map((item, idx) => (
          <button
            key={idx}
            className="sound-toy-btn"
            style={{ borderColor: item.color }}
            onClick={() => handlePlay(item)}
          >
            <div className="sound-toy-icon">{item.icon}</div>
            <div className="sound-toy-title" style={{ fontWeight: 'bold' }}>
              {item.title}
            </div>
            <span style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.3rem' }}>
              눌러봐요! 🎵
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
