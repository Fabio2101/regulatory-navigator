// Pagina: Processo di Marcatura CE – Regulatory Navigator (Stile professionale)
'use client';

export default function ProcessoCEMarking() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">🔧 Processo di Marcatura CE</h1>

        <section className="space-y-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">📋 Step principali</h2>
            <ol className="list-decimal list-inside text-gray-800 leading-relaxed space-y-1">
              <li>Verifica se il prodotto è un dispositivo medico secondo MDR (Art. 2).</li>
              <li>Classificazione del dispositivo (Allegato VIII).</li>
              <li>Scelta della procedura di valutazione della conformità (Allegati IX, X, XI).</li>
              <li>Creazione della documentazione tecnica (Allegato II + III).</li>
              <li>Valutazione clinica (Allegato XIV) e sorveglianza post-market (Allegato III).</li>
              <li>Gestione qualità secondo ISO 13485 (obbligatoria per IIa, IIb, III).</li>
              <li>Redazione della dichiarazione di conformità UE (Allegato IV).</li>
              <li>Registrazione presso EUDAMED e rilascio UDI (identificativo unico del dispositivo).</li>
              <li>Apposizione del marchio CE e immissione sul mercato.</li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">📌 Allegati e Normative di riferimento</h2>
            <label htmlFor="ambitoFiltro" className="block text-sm font-medium text-gray-600 mb-2">Filtra per ambito:</label>
            <select
              id="ambitoFiltro"
              className="mb-6 border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => {
                const selected = e.target.value;
                document.querySelectorAll('[data-ambito]').forEach((el) => {
                  const ambito = el.getAttribute('data-ambito');
                  (el as HTMLElement).style.display = selected === 'Tutti' || ambito === selected ? 'list-item' : 'none';
                });
              }}>
              <option>Tutti</option>
              <option>Qualità</option>
              <option>Rischio</option>
              <option>Software</option>
              <option>Sterilizzazione</option>
              <option>Biocompatibilità</option>
              <option>Clinica</option>
              <option>Etichettatura</option>
            </select>
            <ul className="list-disc list-inside text-gray-700">
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745" target="_blank" className="text-blue-700 underline"><strong>Allegato I</strong> – Requisiti generali di sicurezza e prestazione</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745" target="_blank" className="text-blue-700 underline"><strong>Allegato II</strong> – Documentazione tecnica</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745" target="_blank" className="text-blue-700 underline"><strong>Allegato III</strong> – Sorveglianza post-commercializzazione</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745" target="_blank" className="text-blue-700 underline"><strong>Allegato IV</strong> – Dichiarazione di conformità</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745#d1e2885-1-1" target="_blank" className="text-blue-700 underline"><strong>Allegato VIII</strong> – Regole di classificazione</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745#d1e5064-1-1" target="_blank" className="text-blue-700 underline"><strong>Allegato IX</strong> – Sistema qualità + valutazione tecnica</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745#d1e5292-1-1" target="_blank" className="text-blue-700 underline"><strong>Allegato X</strong> – Valutazione clinica</a></li>
            <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745#d1e5318-1-1" target="_blank" className="text-blue-700 underline"><strong>Allegato XI</strong> – Verifica prodotto</a></li>
            <li data-ambito="Qualità"><a href="https://www.iso.org/standard/59752.html" target="_blank" className="text-blue-700 underline"><strong>ISO 13485</strong> – Sistema di gestione qualità</a></li>
            <li data-ambito="Rischio"><a href="https://www.iso.org/standard/72704.html" target="_blank" className="text-blue-700 underline"><strong>ISO 14971</strong> – Gestione del rischio</a></li>
            <li data-ambito="Software"><a href="https://webstore.iec.ch/publication/22201" target="_blank" className="text-blue-700 underline"><strong>IEC 62304</strong> – Software medicale</a></li>
            <li data-ambito="Software"><a href="https://webstore.iec.ch/publication/26404" target="_blank" className="text-blue-700 underline"><strong>IEC 82304</strong> – Software standalone</a></li>
            <li data-ambito="Sterilizzazione"><a href="https://www.iso.org/standard/66428.html" target="_blank" className="text-blue-700 underline"><strong>ISO 11607</strong> – Confezionamento sterile</a></li>
            <li data-ambito="Sterilizzazione"><a href="https://www.iso.org/standard/66430.html" target="_blank" className="text-blue-700 underline"><strong>ISO 11135</strong> – Sterilizzazione EO</a></li>
            <li data-ambito="Sterilizzazione"><a href="https://www.iso.org/standard/55823.html" target="_blank" className="text-blue-700 underline"><strong>ISO 11137</strong> – Sterilizzazione radiazioni</a></li>
            <li data-ambito="Biocompatibilità"><a href="https://www.iso.org/standard/68936.html" target="_blank" className="text-blue-700 underline"><strong>ISO 10993</strong> – Valutazione biologica</a></li>
            <li data-ambito="Clinica"><a href="https://www.iso.org/standard/71690.html" target="_blank" className="text-blue-700 underline"><strong>ISO 14155</strong> – Buona pratica clinica</a></li>
            <li data-ambito="Etichettatura"><a href="https://www.iso.org/standard/77325.html" target="_blank" className="text-blue-700 underline"><strong>ISO 15223-1</strong> – Simboli etichettatura</a></li>
            <li data-ambito="Etichettatura"><a href="https://www.iso.org/standard/69971.html" target="_blank" className="text-blue-700 underline"><strong>ISO 20417</strong> – Informazioni all’utente</a></li>
            <li data-ambito="Rischio"><a href="https://www.iso.org/standard/82991.html" target="_blank" className="text-blue-700 underline"><strong>ISO/TR 24971</strong> – Linee guida ISO 14971</a></li>
  </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">📎 Risorse utili</h2>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li><a href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745" target="_blank">MDR 2017/745 – Regolamento completo</a></li>
              <li><a href="https://health.ec.europa.eu/system/files/2023-06/md_harmonised_standards_en.pdf" target="_blank">Lista standard armonizzati</a></li>
              <li><a href="https://ec.europa.eu/tools/eudamed" target="_blank">Portale EUDAMED</a></li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
