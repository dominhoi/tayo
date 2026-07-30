import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'gallery', label: '🚌 타요 도감', icon: '🚌' },
    { id: 'quiz', label: '❓ 누구일까요? 퀴즈', icon: '🧩' },
    { id: 'sounds', label: '🔊 빵빵! 소리 놀이터', icon: '📢' },
    { id: 'singalong', label: '🎵 타요 씽어롱', icon: '🎶' }
  ];

  return (
    <header className="app-header">
      <div className="brand-title">
        <span>🚌</span>
        <span>꼬마버스 타요 친구들</span>
        <span>🎈</span>
      </div>
      <p className="brand-subtitle">
        4살 우리 아이를 위한 신나고 재미있는 자동차 웹 도감 & 놀이터!
      </p>

      <nav className="nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
