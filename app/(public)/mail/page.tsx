'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('送信中...');

        const res = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });

        const data = await res.json();
        setStatus(data.success ? '送信成功！' : '送信失敗...');
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="名前"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
        />
        <input
            type="email"
            placeholder="メールアドレス"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
        />
        <textarea
            placeholder="メッセージ"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
        />
        <button type="submit">送信</button>
        <p>{status}</p>
        </form>
    );
}
