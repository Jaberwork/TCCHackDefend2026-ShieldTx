import { useState } from "react";
import { Search, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { getScore } from "../data/mockData";

function Verification() {
  const [numero, setNumero] = useState("");
  const [resultat, setResultat] = useState(null);

  const verifier = () => {
    if (!numero) return;
    const data = getScore(numero);
    if (data) {
      setResultat(data);
    } else {
      setResultat({ numero, score: 5, type: "Aucun signalement", zone: "-", signalements: 0, statut: "fiable" });
    }
  };

  const getStatut = (score) => {
    if (score >= 70) return { label: "DANGEREUX", color: "text-red-500", bg: "bg-red-500/10 border-red-500", icon: <ShieldX size={48} className="text-red-500" /> };
    if (score >= 31) return { label: "SUSPECT", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400", icon: <ShieldAlert size={48} className="text-yellow-400" /> };
    return { label: "FIABLE", color: "text-green-400", bg: "bg-green-400/10 border-green-400", icon: <ShieldCheck size={48} className="text-green-400" /> };
  };

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Vérifier un <span className="text-orange-500">numéro</span>
        </h1>
        <p className="text-gray-400 text-center mb-10">
          Entrez un numéro avant d'envoyer de l'argent
        </p>

        <div className="flex gap-3 mb-10">
          <input
            type="text"
            placeholder="Ex: 90112233"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
          />
          <button
            onClick={verifier}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
          >
            <Search size={18} /> Vérifier
          </button>
        </div>

        {resultat && (() => {
          const statut = getStatut(resultat.score);
          return (
            <div className={`border rounded-xl p-8 text-center ${statut.bg}`}>
              <div className="flex justify-center mb-4">{statut.icon}</div>
              <p className={`text-3xl font-extrabold mb-1 ${statut.color}`}>{statut.label}</p>
              <p className="text-gray-400 mb-6">Score de risque : <span className={`font-bold text-xl ${statut.color}`}>{resultat.score}/100</span></p>

              <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
                <div
                  className={`h-3 rounded-full transition-all ${resultat.score >= 70 ? 'bg-red-500' : resultat.score >= 31 ? 'bg-yellow-400' : 'bg-green-400'}`}
                  style={{ width: `${resultat.score}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Numéro</p>
                  <p className="text-white font-bold">{resultat.numero}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Signalements</p>
                  <p className="text-white font-bold">{resultat.signalements}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Type d'arnaque</p>
                  <p className="text-white font-bold">{resultat.type}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-500 text-sm">Zone</p>
                  <p className="text-white font-bold">{resultat.zone}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

export default Verification;