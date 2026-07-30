import React, { useState } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import QuizGame from './components/QuizGame';
import SoundBoard from './components/SoundBoard';
import SingAlong from './components/SingAlong';
import { CHARACTERS } from './data/characters';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [modalCharacter, setModalCharacter] = useState(null);

  // Filtering Logic
  const filteredCharacters = CHARACTERS.filter((char) => {
    const matchCategory =
      selectedCategory === 'all' || char.category === selectedCategory;

    const matchColor =
      selectedColor === 'all' ||
      char.colorName.includes(selectedColor) ||
      (selectedColor === '분홍색' && char.colorName.includes('분홍'));

    return matchCategory && matchColor;
  });

  return (
    <div className="app-container">
      {/* Header & Tabs */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main>
        {activeTab === 'gallery' && (
          <>
            {/* Category & Color Filters */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />

            {/* Character Grid */}
            {filteredCharacters.length > 0 ? (
              <div className="character-grid">
                {filteredCharacters.map((char) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    onSelectCard={(c) => setModalCharacter(c)}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem',
                  background: 'white',
                  borderRadius: '2rem',
                  boxShadow: 'var(--shadow-soft)'
                }}
              >
                <p style={{ fontSize: '3rem' }}>🔍</p>
                <h3 style={{ fontSize: '1.8rem', color: '#334155' }}>
                  해당하는 버스 친구가 없어요!
                </h3>
                <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.5rem', color: '#64748b' }}>
                  다른 색상이나 카테고리를 눌러서 찾아볼까요?
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'quiz' && <QuizGame />}

        {activeTab === 'sounds' && <SoundBoard />}

        {activeTab === 'singalong' && <SingAlong />}
      </main>

      {/* Modal Popup */}
      <CharacterModal
        character={modalCharacter}
        onClose={() => setModalCharacter(null)}
      />
    </div>
  );
}
