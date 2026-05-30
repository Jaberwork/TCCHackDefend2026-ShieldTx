import { Link } from "react-router-dom";
import { ShieldCheck, AlertTriangle, Search, BarChart2 } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-950">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck size={48} className="text-orange-500" />
          <h1 className="text-5xl font-extrabold text-white">
            Shield<span className="text-orange-500">Tx</span>
          </h1>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mb-4">
          La première plateforme communautaire de détection de fraude
          <span className="text-orange-400 font-semibold"> Mobile Money</span> au Togo.
        </p>
        <p className="text-gray-500 mb-10">
          Vérifiez un numéro avant d'envoyer de l'argent. Signalez une arnaque. Protégez votre communauté.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/verification"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Vérifier un numéro
          </Link>
          <Link
            to="/signalement"
            className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Signaler une fraude
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-16 max-w-5xl mx-auto">
        {[
          { icon: <AlertTriangle className="text-orange-500" size={32} />, value: "128", label: "Numéros signalés" },
          { icon: <Search className="text-orange-500" size={32} />, value: "340", label: "Vérifications effectuées" },
          { icon: <BarChart2 className="text-orange-500" size={32} />, value: "92%", label: "Taux de détection" },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:border-orange-500 transition-all">
            {stat.icon}
            <p className="text-4xl font-extrabold text-white mt-3">{stat.value}</p>
            <p className="text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="bg-gray-900 py-16 px-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Comment ça <span className="text-orange-500">marche ?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: "01", title: "Vérifiez", desc: "Entrez un numéro avant d'envoyer de l'argent — notre algorithme calcule son score de risque en temps réel." },
            { step: "02", title: "Signalez", desc: "Vous avez été arnaqué ? Signalez le numéro en 30 secondes pour protéger les autres utilisateurs." },
            { step: "03", title: "Protégez", desc: "Chaque signalement enrichit notre base et rend la communauté togolaise plus sûre." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-5xl font-extrabold text-orange-500 opacity-40">{item.step}</span>
              <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
              <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-gray-800">
        ShieldTx — #TCCHackDefend2026 · Tech Campus Clubs · IPNET Institute of Technology
      </footer>

    </div>
  );
}

export default Home;