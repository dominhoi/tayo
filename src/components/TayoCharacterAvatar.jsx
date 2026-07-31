import React, { useState } from 'react';
import { getImageUrl } from '../utils/imageHelper';

export default function TayoCharacterAvatar({ character, className = '' }) {
  const [imgError, setImgError] = useState(false);

  // If PNG image exists and has not errored, render it
  if (character.image && !imgError) {
    return (
      <img
        src={getImageUrl(character.image)}
        alt={character.name}
        className={className}
        onError={() => setImgError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  // Otherwise, render a custom, vibrant SVG cartoon illustration for that character
  const color = character.color || '#1E60D5';
  const name = character.name;
  const number = character.number || '';
  const badge = character.badge || '🚗';

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle, #ffffff 0%, ${color}15 100%)`,
        borderRadius: '1.25rem',
        padding: '0.5rem',
        position: 'relative',
        userSelect: 'none'
      }}
    >
      <svg
        viewBox="0 0 200 160"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
      >
        {/* Shadow */}
        <ellipse cx="100" cy="148" rx="75" ry="8" fill="rgba(0,0,0,0.12)" />

        {/* Bus / Vehicle Body */}
        {character.category === 'bus' ? (
          <g>
            {/* Main Bus Box */}
            <rect x="30" y="25" width="140" height="105" rx="20" fill={color} stroke="#1e293b" strokeWidth="4" />
            {/* Roof Top AC / Bumper */}
            <rect x="60" y="15" width="80" height="12" rx="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="3" />
            {/* Front Windshield */}
            <rect x="42" y="38" width="116" height="45" rx="10" fill="#e0f2fe" stroke="#1e293b" strokeWidth="3" />
            {/* Big Cartoon Eyes */}
            <circle cx="75" cy="58" r="10" fill="#ffffff" />
            <circle cx="75" cy="58" r="5" fill="#0f172a" />
            <circle cx="77" cy="56" r="2" fill="#ffffff" />

            <circle cx="125" cy="58" r="10" fill="#ffffff" />
            <circle cx="125" cy="58" r="5" fill="#0f172a" />
            <circle cx="127" cy="56" r="2" fill="#ffffff" />

            {/* Cheerful Mouth */}
            <path d="M 82 72 Q 100 84 118 72" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />

            {/* Route Number Plate */}
            {number && (
              <g>
                <rect x="70" y="90" width="60" height="20" rx="6" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                <text x="100" y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a" fontFamily="sans-serif">
                  {number}
                </text>
              </g>
            )}

            {/* Headlights */}
            <circle cx="45" cy="98" r="7" fill="#fef08a" stroke="#1e293b" strokeWidth="2" />
            <circle cx="155" cy="98" r="7" fill="#fef08a" stroke="#1e293b" strokeWidth="2" />

            {/* Wheels */}
            <circle cx="55" cy="130" r="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
            <circle cx="55" cy="130" r="6" fill="#94a3b8" />

            <circle cx="145" cy="130" r="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
            <circle cx="145" cy="130" r="6" fill="#94a3b8" />
          </g>
        ) : character.category === 'rescue' ? (
          <g>
            {/* Rescue Vehicle Body */}
            <rect x="35" y="40" width="130" height="90" rx="16" fill={color} stroke="#1e293b" strokeWidth="4" />
            {/* Windshield */}
            <rect x="48" y="50" width="104" height="40" rx="8" fill="#e0f2fe" stroke="#1e293b" strokeWidth="3" />
            {/* Eyes */}
            <circle cx="80" cy="68" r="9" fill="#ffffff" />
            <circle cx="80" cy="68" r="4.5" fill="#0f172a" />
            <circle cx="120" cy="68" r="9" fill="#ffffff" />
            <circle cx="120" cy="68" r="4.5" fill="#0f172a" />

            {/* Siren Roof Bar */}
            <rect x="80" y="26" width="40" height="15" rx="5" fill="#ef4444" stroke="#1e293b" strokeWidth="3" />
            <circle cx="90" cy="33.5" r="4" fill="#3b82f6" />
            <circle cx="110" cy="33.5" r="4" fill="#f59e0b" />

            {/* Mouth */}
            <path d="M 85 82 Q 100 92 115 82" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />

            {/* Wheels */}
            <circle cx="60" cy="130" r="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
            <circle cx="140" cy="130" r="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
          </g>
        ) : (
          <g>
            {/* General Car / Heavy / Train Body */}
            <rect x="35" y="45" width="130" height="85" rx="18" fill={color} stroke="#1e293b" strokeWidth="4" />
            {/* Windshield */}
            <rect x="50" y="55" width="100" height="38" rx="8" fill="#f0f9ff" stroke="#1e293b" strokeWidth="3" />
            {/* Eyes */}
            <circle cx="82" cy="73" r="8" fill="#ffffff" />
            <circle cx="82" cy="73" r="4" fill="#0f172a" />
            <circle cx="118" cy="73" r="8" fill="#ffffff" />
            <circle cx="118" cy="73" r="4" fill="#0f172a" />

            {/* Smile */}
            <path d="M 86 86 Q 100 94 114 86" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />

            {/* Wheels */}
            <circle cx="60" cy="130" r="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
            <circle cx="140" cy="130" r="14" fill="#334155" stroke="#1e293b" strokeWidth="3" />
          </g>
        )}

        {/* Center Badge Icon Overlay */}
        <text x="100" y="32" textAnchor="middle" fontSize="22">
          {badge}
        </text>
      </svg>

      {/* Label */}
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e293b', marginTop: '0.2rem' }}>
        {name}
      </span>
    </div>
  );
}
