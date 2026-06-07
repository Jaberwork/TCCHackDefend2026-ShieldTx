// React state : gère le formulaire et l’état “envoyé”.
import { useState } from "react";

// Icônes : triangle pour l’entrée, check pour la confirmation.
import { AlertTriangle, CheckCircle } from "lucide-react";

function Signalement() {
  // form : toutes les valeurs du formulaire.
  const [form, setForm] = useState({
    numero: "",
    type: "",
    zone: "",
    description: "",
  });

  // envoyé (envoye) : bascule entre le formulaire et la page de succès.
  const [envoye, setEnvoye] = useState(false);

  // Listes d’options pour les champs “Type” et “Zone”.
  const types = [
    "Phishing SMS",
    "Faux gain",
    "Usurpation d'identité",
    "SIM Swap",
    "Autre",
  ];

  const zones = ["Lomé", "Sokodé", "Kara", "Atakpamé", "Kpalimé", "Autre"];

  // handleSubmit : validation minimale puis passage à la vue “envoyé”.
 const handleSubmit = () => {
  if (!form.numero || !form.type || !form.zone) return;
  setEnvoye(true);
};

  // Si l’utilisateur a “envoyé” : on affiche une confirmation.
  if (envoye)
    return (
      <div className="min-h-screen overflow-x-hidden bg-gray-950 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Signalement envoyé !
          </h2>
          <p className="text-gray-400 mb-6">
            Merci de protéger la communauté togolaise.
          </p>

          {/* Reset : revient au formulaire vierge */}
          <button
            onClick={() => {
              setEnvoye(false);
              setForm({ numero: "", type: "", zone: "", description: "" });
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-all"
          >
            Nouveau signalement
          </button>
        </div>
      </div>
    );

  // Sinon : affichage du formulaire.
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-950 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-xl">
        {/* En-tête page */}
        <div className="flex items-center gap-3 mb-2 justify-center">
          <AlertTriangle className="text-orange-500" size={32} />
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Signaler une <span className="text-orange-500">fraude</span>
          </h1>
        </div>

        <p className="text-gray-400 text-center mb-10">
          Protégez votre communauté en signalant un numéro suspect
        </p>

        {/* Bloc formulaire */}
        <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-5 sm:p-8 flex flex-col gap-5">
          {/* Champ numéro */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Numéro suspect *
            </label>
            <input
              type="text"
              placeholder="Ex: 90112233"
              value={form.numero}
              onChange={(e) =>
                setForm({
                  ...form,
                  numero: e.target.value,
                })
              }
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Champ type */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Type d'arnaque *
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            >
              <option value="">Sélectionner...</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Champ zone */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Zone *
            </label>
            <select
              value={form.zone}
              onChange={(e) => setForm({ ...form, zone: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
            >
              <option value="">Sélectionner...</option>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          {/* Description optionnelle */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">
              Description (optionnel)
            </label>
            <textarea
              placeholder="Décrivez brièvement ce qui s'est passé..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 resize-none"
            />
          </div>

          {/* Bouton soumission */}
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            Envoyer le signalement
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signalement;

