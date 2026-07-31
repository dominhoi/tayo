import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CHARACTERS } from '../data/characters';
import { speakGreeting, playSoundEffect } from '../utils/audio';
import TayoCharacterAvatar from './TayoCharacterAvatar';

export default function QuizGame() {
  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const startNewQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    // Pick 1 target character
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    const selectedTarget = CHARACTERS[randomIndex];
    setTarget(selectedTarget);

    // Pick 2 other random options
    const otherChars = CHARACTERS.filter((c) => c.id !== selectedTarget.id);
    const shuffledOthers = [...otherChars].sort(() => 0.5 - Math.random());
    const roundOptions = [selectedTarget, shuffledOthers[0], shuffledOthers[1]].sort(
      () => 0.5 - Math.random()
    );
    setOptions(roundOptions);

    // Read hint TTS & play sound
    const hintMsg = `누구일까요? ${selectedTarget.quizHint}`;
    speakGreeting(hintMsg);
    playSoundEffect(selectedTarget.soundType);
  };

  useEffect(() => {
    startNewQuestion();
  }, []);

  const handleSelectOption = (option) => {
    if (selectedAnswer) return; // Prevent double click

    setSelectedAnswer(option);
    if (option.id === target.id) {
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      playSoundEffect('correct_fanfare');
      speakGreeting(`딩동댕! 정답이에요! 나는 ${target.name}야!`);

      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setIsCorrect(false);
      speakGreeting(`아쉬워요! 다시 한 번 생각해보자!`);
    }
  };

  const handlePlayHintSound = () => {
    if (!target) return;
    speakGreeting(`힌트! ${target.quizHint}`);
    playSoundEffect(target.soundType);
  };

  if (!target) return null;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-score-badge">
          <span>⭐ 획득한 별: {score}개</span>
        </div>
        <h2 style={{ fontSize: '2.2rem', color: '#1e293b', marginBottom: '0.5rem' }}>
          🧩 누구일까요? 맞춰보세요!
        </h2>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: '1.5rem', color: '#475569' }}>
          소리와 힌트를 듣고 알맞은 타요 친구를 찾아봐요!
        </p>
      </div>

      {/* Quiz Card Prompt */}
      <div className="quiz-card-prompt">
        <p className="quiz-prompt-text">
          🔍 "{target.quizHint}"
        </p>

        <button
          className="tab-btn active"
          onClick={handlePlayHintSound}
          style={{ margin: '0 auto', fontSize: '1.2rem' }}
        >
          <span>📢 소리 힌트 다시 듣기</span>
        </button>
      </div>

      {/* Result Alert */}
      {isCorrect !== null && (
        <div
          style={{
            margin: '1.5rem 0',
            padding: '1rem',
            borderRadius: '1.5rem',
            backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2',
            color: isCorrect ? '#166534' : '#991b1b',
            fontSize: '1.6rem',
            fontWeight: 'bold'
          }}
        >
          {isCorrect ? '🎉 딩동댕! 참 잘했어요! 🎉' : '😅 아쉬워요! 힌트를 들고 다시 찾아볼까요?'}
        </div>
      )}

      {/* Options Grid */}
      <div className="quiz-options-grid">
        {options.map((option) => (
          <div
            key={option.id}
            className="quiz-option-card"
            onClick={() => handleSelectOption(option)}
            style={{
              borderColor:
                selectedAnswer?.id === option.id
                  ? isCorrect
                    ? '#22c55e'
                    : '#ef4444'
                  : '#cbd5e1'
            }}
          >
            <div style={{ width: '140px', height: '120px', marginBottom: '0.75rem' }}>
              <TayoCharacterAvatar character={option} className="quiz-option-img" />
            </div>
            <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e293b' }}>
              {option.badge} {option.name}
            </span>
          </div>
        ))}
      </div>

      {/* Next Question Button */}
      {selectedAnswer && (
        <div style={{ marginTop: '2rem' }}>
          <button
            className="tab-btn active"
            onClick={startNewQuestion}
            style={{ margin: '0 auto', fontSize: '1.4rem', padding: '1rem 2rem' }}
          >
            <span>다음 문제 풀래! ➡️</span>
          </button>
        </div>
      )}
    </div>
  );
}
