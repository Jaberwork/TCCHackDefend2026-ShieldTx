// React state : on stocke le numéro saisi et le résultat de vérification.
import { useState } from "react";

// Icônes pour afficher le bouton et l’indicateur (fiable/suspect/dangereux).
import { Search, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

// Données de démonstration : calcule le “score” à partir d’un numéro.
import { verifierNumerMock } from "../data/mockData";

function Verification() {
  // numero : valeur du champ de saisie.
  const [numero, setNumero] = useState("");

  // resultat : objet renvoyé par getScore(numero) ou un fallback si aucun rapport.
  const [resultat, setResultat] = useState(null);

  // verifier : déclenché par le bouton “Vérifier”.
  const verifier = () => {
  if (!numero) return;
  const data = verifierNumerMock(numero);
  setResultat({
    numero: data.numero,
    score: data.score,
    type: data.type_fraude || "Aucun signalement",
    zone: data.zone || "Inconnue", 
    signalements: data.nb_signalements
  });
};

  // getStatut : transforme un score numérique en statut UI (couleurs + libellé + icône).
  const getStatut = (score) => {
    // Seuil haut : très dangereux.
    if (score >= 70)
      return {
        label: "DANGEREUX",
        color: "text-red-500",
        bg: "bg-red-500/10 border-red-500",
        icon: <ShieldX size={48} className="text-red-500" />,
      };

    // Seuil intermédiaire : suspect.
    if (score >= 31)
      return {
        label: "SUSPECT",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10 border-yellow-400",
        icon: <ShieldAlert size={48} className="text-yellow-400" />,
      };

    // Sinon : fiable.
    return {
      label: "FIABLE",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400",
      icon: <ShieldCheck size={48} className="text-green-400" />,
    };
  };

  // UI : si resultat n’est pas null, on affiche un bloc de résultat.
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-950 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        {/* Titre de la page */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-2">
          Vérifier un <span className="text-orange-500">numéro</span>
        </h1>

        {/* Sous-texte */}
        <p className="text-gray-400 text-center mb-10">
          Entrez un numéro avant d'envoyer de l'argent
        </p>

        {/* Zone saisie + bouton */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Ex: 90112233"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
          />

          {/* Clique -> exécute verifier() */}
          <button
            onClick={verifier}
            className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition-all hover:bg-orange-600"
          >
            <Search size={18} /> Vérifier
          </button>
        </div>

        {/* Rendu conditionnel : résultat seulement après vérification */}
        {resultat &&
          (() => {
            // On calcule le “statut UI” à partir du score.
            const statut = getStatut(resultat.score);

            return (
              <div
                className={`border rounded-xl p-8 text-center ${statut.bg}`}
              >
                {/* Gros pictogramme */}
                <div className="flex justify-center mb-4">{statut.icon}</div>

                {/* Libellé statut */}
                <p
                  className={`text-3xl font-extrabold mb-1 ${statut.color}`}
                >
                  {statut.label}
                </p>

                {/* Score numérique */}
                <p className="text-gray-400 mb-6">
                  Score de risque :{" "}
                  <span
                    className={`font-bold text-xl ${statut.color}`}
                  >
                    {resultat.score}/100
                  </span>
                </p>

                {/* Barre de progression (visualise le score) */}
                <div className="w-full bg-gray-800 rounded-full h-3 mb-6">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      resultat.score >= 70
                        ? "bg-red-500"
                        : resultat.score >= 31
                          ? "bg-yellow-400"
                          : "bg-green-400"
                    }`}
                    style={{ width: `${resultat.score}%` }}
                  />
                </div>

                {/* Détails (2 colonnes) */}
                <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
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

