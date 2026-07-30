import React from 'react';
import { CATEGORIES, COLOR_FILTERS } from '../data/characters';

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor
}) {
  return (
    <div className="filters-container">
      {/* Category Row */}
      <div className="filter-row">
        <span className="filter-label">차종 분류:</span>
        <div className="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.badge}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Row */}
      <div className="filter-row">
        <span className="filter-label">색상별:</span>
        <div className="filter-pills">
          {COLOR_FILTERS.map((col) => (
            <button
              key={col.id}
              className={`pill-btn ${selectedColor === col.id ? 'active' : ''}`}
              onClick={() => setSelectedColor(col.id)}
            >
              <span>{col.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
