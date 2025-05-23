// Valutazioni Salvate – Regulatory Navigator
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, RotateCcw } from 'lucide-react';

type Valutazione = {
  nome: string;
  classe: string;
  norme: string[];
};

const getCEWorkflow = (classe: string) => {
  switch (classe) {
    case 'I':
      return [
        '✔️ Autocertificazione (no Notified Body richiesto)',
        '✔️ Documentazione tecnica base',
        '✔️ Dichiarazione di conformità',
        '✔️ Seguire allegato IV del MDR',
        '🔗 https://health.ec.europa.eu/system/files/2023-06/md_harmonised_standards_en.pdf'
      ];
    case 'IIa':
      return [
        '✔️ Richiesto coinvolgimento di un Notified Body',
        '✔️ Documentazione tecnica dettagliata',
        '✔️ Seguire Allegato IX o XI del MDR',
        '🔗 https://health.ec.europa.eu/system/files/2023-06/md_harmonised_standards_en.pdf'
      ];
    case 'IIb':
    case 'III':
      return [
        '✔️ Notified Body obbligatorio',
        '✔️ Sistema qualità conforme a ISO 13485',
        '✔️ Clinical Evaluation (sperimentazione o equivalenza)',
        '✔️ Seguire Allegato IX, X e XI del MDR',
        '🔗 https://health.ec.europa.eu/system/files/2023-06/md_harmonised_standards_en.pdf'
      ];
    default:
      return [];
  }
};

export default function ValutazioniSalvate() {
  const [salvati, setSalvati] = useState<Valutazione[]>([]);
  const [cestino, setCestino] = useState<Valutazione[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('risultati_salvati');
    const trash = localStorage.getItem('risultati_cestino');
    if (stored) setSalvati(JSON.parse(stored));
    if (trash) setCestino(JSON.parse(trash));

    const nuova = localStorage.getItem('valutazione_da_salvare');
    if (nuova) {
      const valutazione: Valutazione = JSON.parse(nuova);
      const aggiornato = [...(stored ? JSON.parse(stored) : []), valutazione];
      setSalvati(aggiornato);
      localStorage.setItem('risultati_salvati', JSON.stringify(aggiornato));
      localStorage.removeItem('valutazione_da_salvare');
    }
  }, []);

  const eliminaValutazione = (index: number) => {
    const daRimuovere = salvati[index];
    const nuoviSalvati = salvati.filter((_, i) => i !== index);
    const nuovoCestino = [...cestino, daRimuovere];
    setSalvati(nuoviSalvati);
    setCestino(nuovoCestino);
    localStorage.setItem('risultati_salvati', JSON.stringify(nuoviSalvati));
    localStorage.setItem('risultati_cestino', JSON.stringify(nuovoCestino));
  };

  const ripristinaValutazione = (index: number) => {
    const daRipristinare = cestino[index];
    const nuovoCestino = cestino.filter((_, i) => i !== index);
    const nuoviSalvati = [...salvati, daRipristinare];
    setSalvati(nuoviSalvati);
    setCestino(nuovoCestino);
    localStorage.setItem('risultati_salvati', JSON.stringify(nuoviSalvati));
    localStorage.setItem('risultati_cestino', JSON.stringify(nuovoCestino));
  };

  const eliminaDefinitivamente = (index: number) => {
    const nuovoCestino = cestino.filter((_, i) => i !== index);
    setCestino(nuovoCestino);
    localStorage.setItem('risultati_cestino', JSON.stringify(nuovoCestino));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧾 Valutazioni Salvate</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Torna alla home</Link>
      </div>

      {salvati.length === 0 ? (
        <p className="text-center text-sm text-gray-500">Nessuna valutazione salvata.</p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {salvati.map((r, i) => (
            <li key={i} className="bg-white p-4 rounded shadow relative">
              <button onClick={() => eliminaValutazione(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
              <p className="font-semibold">🩺 {r.nome || 'Dispositivo ' + (i + 1)}</p>
              <p>Classe: {r.classe}</p>
              <p>Norme: {r.norme.join(', ')}</p>
              <div className="mt-2">
                <p className="font-medium">📌 Percorso CE Marking:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {getCEWorkflow(r.classe).map((step, j) => (
                    <li key={j}>{step}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🗑️ Cestino</h2>
        {cestino.length === 0 ? (
          <p className="text-sm text-gray-500">Il cestino è vuoto.</p>
        ) : (
          <ul className="space-y-4 max-w-3xl mx-auto">
            {cestino.map((r, i) => (
              <li key={i} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">🩺 {r.nome || 'Dispositivo ' + (i + 1)}</p>
                  <p className="text-sm">Classe: {r.classe} | Norme: {r.norme.join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => ripristinaValutazione(i)} className="text-green-600 hover:text-green-800">
                    <RotateCcw size={18} />
                  </button>
                  <button onClick={() => eliminaDefinitivamente(i)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
