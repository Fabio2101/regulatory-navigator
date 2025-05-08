// components/AssistenteAI.tsx
'use client';
import { useState } from 'react';

export default function AssistenteAI() {
  const [query, setQuery] = useState('');
  const [risposta, setRisposta] = useState('');
  const [loading, setLoading] = useState(false);

  const chiediAllAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL || '/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      const data = await res.json();
      setRisposta(data.risposta);
    } catch {
      setRisposta('Errore di rete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">🤖 LexAI</h2>
      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="Scrivi la tua domanda..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={chiediAllAI}
        disabled={loading}
        className="bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded"
      >
        {loading ? 'Sto pensando…' : 'Chiedi'}
      </button>
      {risposta && (
        <div className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
          {risposta}
        </div>
      )}
    </div>
  );
}
