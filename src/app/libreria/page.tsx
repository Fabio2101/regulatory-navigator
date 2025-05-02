// Libreria Normativa – Regulatory Navigator (Stile professionale)
'use client';

import { useState } from 'react';

const normativa = [
  { nome: 'MDR 2017/745', categoria: 'Regolamento UE', link: 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745' },
  { nome: 'IVDR 2017/746', categoria: 'Regolamento UE', link: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0746' },
  { nome: 'ISO 13485', categoria: 'Qualità / QMS', link: 'https://www.iso.org/standard/59752.html' },
  { nome: 'ISO 14971', categoria: 'Gestione del Rischio', link: 'https://www.iso.org/standard/72704.html' },
  { nome: 'ISO 10993', categoria: 'Biocompatibilità', link: 'https://www.iso.org/standard/68936.html' },
  { nome: 'ISO 14155', categoria: 'Sperimentazione Clinica', link: 'https://www.iso.org/standard/71690.html' },
  { nome: 'ISO 15223-1', categoria: 'Etichettatura / Simboli', link: 'https://www.iso.org/standard/77325.html' },
  { nome: 'ISO 11607', categoria: 'Confezionamento Sterile', link: 'https://www.iso.org/standard/66428.html' },
  { nome: 'ISO 11135', categoria: 'Sterilizzazione (EO)', link: 'https://www.iso.org/standard/66430.html' },
  { nome: 'ISO 11137', categoria: 'Sterilizzazione (Radiazioni)', link: 'https://www.iso.org/standard/55823.html' },
  { nome: 'IEC 60601', categoria: 'Sicurezza Elettrica', link: 'https://webstore.iec.ch/publication/2612' },
  { nome: 'IEC 62304', categoria: 'Software Medicale', link: 'https://webstore.iec.ch/publication/22201' },
  { nome: 'IEC 82304-1', categoria: 'Software Standalone', link: 'https://webstore.iec.ch/publication/26404' },
  { nome: 'UDI', categoria: 'Tracciabilità', link: 'https://ec.europa.eu/health/md_sector/new_regulations/udi_en' },
  { nome: 'PMS / Vigilanza', categoria: 'Sorveglianza Post-Market', link: 'https://health.ec.europa.eu/system/files/2021-10/md_guidance_pms_rev1_en_0.pdf' },
  { nome: 'MDCG Guidelines', categoria: 'Linee Guida MDR', link: 'https://health.ec.europa.eu/system/files/2021-07/mdcg_guidance_overview_en_0.pdf' },
  { nome: 'HTA/HTM Guidance', categoria: 'Valutazione Tecnologie', link: 'https://www.htad-ifmbe-elearning.org/' }
];

export default function LibreriaNormativa() {
  const [filtro, setFiltro] = useState('Tutte');
  const categorie = ['Tutte', ...Array.from(new Set(normativa.map(n => n.categoria)))];
  const visualizzate = filtro === 'Tutte' ? normativa : normativa.filter(n => n.categoria === filtro);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">📚 Libreria Normativa</h1>

        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6">
          <div className="mb-4 text-center">
            <label className="block text-sm font-medium text-gray-600 mb-2">Filtra per categoria:</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              {categorie.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <ul className="space-y-4">
            {visualizzate.map(norma => (
              <li key={norma.nome} className="bg-blue-50 p-4 rounded shadow-sm border border-blue-200">
                <p className="font-semibold text-blue-800">{norma.nome}</p>
                <p className="text-sm text-gray-600 mb-1">Categoria: {norma.categoria}</p>
                <a
                  href={norma.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline text-sm"
                >
                  Vai alla norma ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
