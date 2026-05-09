'use client';
import React, { useState } from 'react';
import { NumericKeypad } from '@/components/NumericKeypad';

export default function Page() {
  const [num, setNum] = useState('');

  return (
    <div style={{ marginTop: 50, textAlign: 'center' }}>
      <h2>タッチパネル数字入力</h2>
      <NumericKeypad value={num} onChange={setNum} />

      <p style={{ marginTop: 20, fontSize: 24 }}>
        入力値: {num}
      </p>
    </div>
  );
}
