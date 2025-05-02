// Regulatory Navigator – Wizard MDR + Libreria Normativa + PDF Export + Salva valutazione
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';

interface Question {
  id: number;
  text: string;
  key: string;
  nextYes?: number;
  nextNo?: number;
}

const questions: Question[] = [
  { id: 0 , text: 'Hai predisposto una documentazione tecnica completa?', key: 'doc_tecnica', nextYes: 1, nextNo: 1 },
  { id: 1, text: 'Hai già realizzato una valutazione clinica?', key: 'valutazione_clinica', nextYes: 2, nextNo: 2 },
  { id: 2, text: 'Hai redatto la dichiarazione di conformità UE?', key: 'dichiarazione_conformita', nextYes: 3, nextNo: 3 },
  { id: 3, text: "Hai preparato un manuale d'uso per l'utente?", key: 'manuale_uso', nextYes: 4, nextNo: 4 },
  { id: 4, text: 'Hai un sistema di tracciabilità della produzione?', key: 'tracciabilita_produzione', nextYes: 5, nextNo: 5 },
  { id: 5, text: 'Hai un processo di gestione dei reclami?', key: 'gestione_reclami', nextYes: 6, nextNo: 6 },
  { id: 6, text: 'Il prodotto ha una finalità medica esplicita?', key: 'uso_medico', nextYes: 7, nextNo: 18 },
  { id: 7, text: 'È destinato alla diagnosi, prevenzione, monitoraggio o trattamento di una malattia?', key: 'diagnosi', nextYes: 8, nextNo: 18 },
  { id: 8, text: 'È impiantabile nel corpo umano?', key: 'impiantabile', nextYes: 9, nextNo: 10 },
  { id: 9, text: "L'impianto è superiore a 30 giorni?", key: 'impianto_lungo', nextYes: 11, nextNo: 11 },
  { id: 10, text: 'È un software che supporta decisioni cliniche?', key: 'software_clinico', nextYes: 11, nextNo: 12 },
  { id: 11, text: 'Il dispositivo è destinato a uso critico o supporta funzioni vitali?', key: 'vitale', nextYes: 13, nextNo: 13 },
  { id: 12, text: 'È un dispositivo riutilizzabile o che misura parametri biologici?', key: 'sterile_misura', nextYes: 13, nextNo: 14 },
  { id: 13, text: 'È destinato a pazienti pediatrici, fragili o ambienti domiciliari?', key: 'fragili', nextYes: 15, nextNo: 15 },
  { id: 14, text: 'Il dispositivo è cosmetico o estetico (es. filler, lenti colorate)?', key: 'estetico', nextYes: 15, nextNo: 15 },
  { id: 15, text: 'È conforme al significato di “dispositivo medico” secondo MDR?', key: 'conformita' },
  { id: 18, text: 'Non è considerabile dispositivo medico. Mostrare comunque normative di riferimento?', key: 'non_md' }
];


const normativeLinks: { [key: string]: string } = {
  'MDR 2017/745': 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32017R0745',
  'IVDR 2017/746': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0746',
  'ISO 13485': 'https://www.iso.org/standard/59752.html',
  'ISO 14971': 'https://www.iso.org/standard/72704.html',
  'IEC 60601': 'https://webstore.iec.ch/publication/2612',
  'IEC 62304': 'https://webstore.iec.ch/publication/22201',
  'ISO 10993': 'https://www.iso.org/standard/68936.html',
  'UDI': 'https://ec.europa.eu/health/md_sector/new_regulations/udi_en',
  'PMS / Vigilanza': 'https://health.ec.europa.eu/system/files/2021-10/md_guidance_pms_rev1_en_0.pdf',
  'HTA/HTM Guidance': 'https://www.htad-ifmbe-elearning.org/'
};

function generatePDF(classe: string, norme: string[]) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Regulatory Navigator – Risultato del questionario", 10, 20);
  doc.setFontSize(12);
  doc.text(`Classe stimata del dispositivo: ${classe}`, 10, 40);
  doc.text("Normative applicabili:", 10, 50);
  norme.forEach((n, i) => doc.text(`- ${n}`, 10, 60 + i * 10));
  doc.save("regulatory_navigator_risultato.pdf");
}

export default function Wizard() {
  const [deviceName, setDeviceName] = useState('');
  const [responses, setResponses] = useState<{ [key: string]: boolean }>({});
  const [currentId, setCurrentId] = useState(1);
  const [result, setResult] = useState<{ classe: string; norme: string[]; isMD: boolean } | null>(null);
  const router = useRouter();

  const currentQuestion = questions.find((q) => q.id === currentId);

  const handleResponse = (answer: boolean) => {
    if (!currentQuestion) return;
    const newResponses = { ...responses, [currentQuestion.key]: answer };
    setResponses(newResponses);

    if (currentQuestion.nextYes || currentQuestion.nextNo) {
      const nextId = answer ? currentQuestion.nextYes : currentQuestion.nextNo;
      if (nextId) setCurrentId(nextId);
    } else {
      calculateResult(newResponses);
    }
  };

  const calculateResult = (allResponses: { [key: string]: boolean }) => {
    if (!allResponses.uso_medico || !allResponses.diagnosi) {
      setResult({ classe: '-', norme: ['HTA/HTM Guidance'], isMD: false });
      return;
    }

    let classe = 'I';
    let norme = ['MDR 2017/745'];

    if (allResponses.doc_tecnica) norme.push('Documentazione tecnica');
    if (allResponses.valutazione_clinica) norme.push('Valutazione clinica');
    if (allResponses.dichiarazione_conformita) norme.push('Dichiarazione di conformità UE');
    if (allResponses.manuale_uso) norme.push("Manuale d'uso");
    if (allResponses.tracciabilita_produzione) norme.push('Tracciabilità produzione');
    if (allResponses.gestione_reclami) norme.push('Gestione dei reclami');

    if (allResponses.software_clinico) norme.push('IEC 62304', 'IEC 60601');
    if (allResponses.impiantabile && allResponses.vitale) classe = 'III';
    else if (allResponses.impiantabile || allResponses.software_clinico) classe = 'IIb';
    else if (allResponses.sterile_misura) classe = 'IIa';
    else if (allResponses.estetico) classe = 'I';

    if (classe !== 'I') norme.push('ISO 13485', 'ISO 14971');
    if (allResponses.vitale) norme.push('ISO 10993');
    if (allResponses.fragili || classe === 'III') norme.push('PMS / Vigilanza');
    if (classe === 'III' || classe === 'IIb') norme.push('UDI');

    norme = Array.from(new Set(norme));
    setResult({ classe, norme, isMD: true });
  };

  const salvaValutazione = () => {
    const nuova = {
      nome: deviceName,
      classe: result?.classe || '-',
      norme: result?.norme || []
    };
    localStorage.setItem('valutazione_da_salvare', JSON.stringify(nuova));
    alert('✅ Valutazione salvata con successo!');
    router.push('/valutazioni');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-6">Regulatory Navigator – Classificazione MDR</h1>

        {!result && currentQuestion ? (
          <div className="space-y-6">
            {currentId === 1 && (
              <div>
                <label className="text-sm font-medium text-gray-700">Nome del dispositivo</label>
                <input
                  className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring focus:border-blue-400"
                  placeholder="es. Monitor Cardiaco AI"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                />
              </div>
            )}
            <p className="text-lg font-medium text-gray-800">{currentQuestion.text}</p>
            <div className="flex gap-4">
              <button onClick={() => handleResponse(true)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Sì</button>
              <button onClick={() => handleResponse(false)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">No</button>
            </div>
          </div>
        ) : result ? (
          <div className="text-center space-y-4">
            {!result.isMD ? (
              <p className="text-xl font-semibold text-red-600">Il prodotto non rientra nella definizione di dispositivo medico secondo MDR.</p>
            ) : (
              <>
                <p className="text-xl font-semibold text-blue-800">Classe stimata: {result.classe}</p>
                <p className="text-base text-gray-700">Normative applicabili:</p>
              </>
            )}
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {result.norme.map((norma) => (
                <li key={norma}>
                  <a href={normativeLinks[norma]} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{norma}</a>
                </li>
              ))}
            </ul>
            {result.isMD && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => generatePDF(result.classe, result.norme)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  📄 Esporta PDF
                </button>
                <button
                  onClick={salvaValutazione}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  💾 Salva valutazione
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setCurrentId(1);
                setResponses({});
                setResult(null);
                setDeviceName('');
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              🔄 Ricomincia il questionario
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}