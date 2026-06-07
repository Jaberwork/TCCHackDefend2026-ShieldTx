// Link : permet de naviguer entre pages sans recharger le navigateur.
import { Link } from "react-router-dom";


// Icônes UI (lucide-react) pour rendre l’interface plus lisible.
import { ShieldCheck, AlertTriangle, Search, BarChart2 } from "lucide-react";

function Home() {
  // Composant “page” : Home affiche le landing page.
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-950">
      {/* HERO : zone d’introduction + boutons d’action */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        {/* En-tête : logo/nom + icône */}
        <div className="flex items-center gap-3 mb-6">
          {/* Icône principale de confiance : renforce la crédibilité visuelle */}
          <ShieldCheck size={48} className="text-orange-500" />

          {/* Titre : la partie "Tx" est stylisée pour l’identité */}
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Shield<span className="text-orange-500">Tx</span>
          </h1>
        </div>

        {/* Pitch : description produit + mise en avant “Mobile Money” */}
        <p className="max-w-2xl text-lg text-gray-400 sm:text-xl mb-4">
          La première plateforme communautaire de détection de fraude
          <span className="text-orange-400 font-semibold"> Mobile Money</span> au Togo.
        </p>

        {/* Appel à l’action en 1 phrase */}
        <p className="text-gray-500 mb-10">
          Vérifiez un numéro avant d'envoyer de l'argent. Signalez une arnaque. Protégez votre communauté.
        </p>

        {/* Boutons : navigation vers les pages principales */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/verification"
            // Classe Tailwind : bouton orange principal
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Vérifier un numéro
          </Link>

          <Link
            to="/signalement"
            // Classe Tailwind : bouton outline orange
            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Signaler une fraude
          </Link>
        </div>
      </section>

      {/* STATS : 3 cartes calculées via un tableau + map */}
      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 md:grid-cols-3 md:px-10 md:py-16">
        {[
          // Note : ces valeurs sont en dur (mock) pour l’UI
          { icon: <AlertTriangle className="text-orange-500" size={32} />, value: "128", label: "Numéros signalés" },
          { icon: <Search className="text-orange-500" size={32} />, value: "340", label: "Vérifications effectuées" },
          { icon: <BarChart2 className="text-orange-500" size={32} />, value: "92%", label: "Taux de détection" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:border-orange-500 transition-all"
          >
            {/* Icône */}
            {stat.icon}
            {/* Valeur (string) */}
            <p className="text-4xl font-extrabold text-white mt-3">{stat.value}</p>
            {/* Label */}
            <p className="text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* COMMENT CA MARCHE : étapes, aussi générées via map */}
      <section className="bg-gray-900 px-4 py-12 sm:px-6 md:px-10 md:py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Comment ça <span className="text-orange-500">marche ?</span>
        </h2>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { step: "01", title: "Vérifiez", desc: "Entrez un numéro avant d'envoyer de l'argent — notre algorithme calcule son score de risque en temps réel." },
            { step: "02", title: "Signalez", desc: "Vous avez été arnaqué ? Signalez le numéro en 30 secondes pour protéger les autres utilisateurs." },
            { step: "03", title: "Protégez", desc: "Chaque signalement enrichit notre base et rend la communauté togolaise plus sûre." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Numéro d’étape */}
              <span className="text-5xl font-extrabold text-orange-500 opacity-40">{item.step}</span>
              {/* Titre étape */}
              <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
              {/* Description */}
              <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER : crédits / mentions */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-gray-800">
        ShieldTx — #TCCHackDefend2026 · Tech Campus Clubs · IPNET Institute of Technology
      </footer>
    </div>
  );
}

export default Home;
