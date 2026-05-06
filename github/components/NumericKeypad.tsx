'use client';
import React from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function NumericKeypad({ value, onChange }: Props) {
  const handleClick = (num: string) => onChange(value + num);
  const handleBack = () => onChange(value.slice(0, -1));
  const handleClear = () => onChange('');

  return (
    <div style={{ width: 260, margin: '0 auto' }}>
      <input
        type="text"
        value={value}
        readOnly
        style={{
          width: '100%',
          fontSize: 32,
          textAlign: 'right',
          marginBottom: 10,
          padding: 10,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button key={n} onClick={() => handleClick(String(n))} style={btnStyle}>
            {n}
          </button>
        ))}
        <button onClick={() => handleClick('0')} style={{ ...btnStyle, gridColumn: 'span 2' }}>0</button>
        <button onClick={() => handleClick('.')} style={btnStyle}>.</button>
        <button onClick={handleClear} style={btnStyle}>C</button>
        <button onClick={handleBack} style={btnStyle}>←</button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  fontSize: 28,
  padding: '20px 0',
  borderRadius: 8,
  border: '1px solid #ccc',
  background: '#f2f2f2',
  touchAction: 'manipulation',
};
