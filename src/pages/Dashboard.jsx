// Données mock utilisées pour alimenter les graphes + le tableau.
// Mis à jour avec tes nouveaux exports de mockData.js
import { mockNumeros, mockTransactions, mockStats } from "../data/mockData";

// Composants Recharts pour rendre des visualisations (Bar, Pie, etc.).
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Palette de couleurs pour le PieChart.
const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"];

function Dashboard() {
  // 1) Transformation dynamique des transactions pour l'histogramme (Signalements par mois / par date)
  // Recharts a besoin d'un tableau pour le BarChart. On adapte par rapport à mockTransactions.
  const histogrammeData = mockTransactions.map(t => ({
    date: new Date(t.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    "Montant (FCFA)": t.montant
  }));

  // 2) Transformation des mockNumeros pour le Camembert (PieChart) groupé par type de fraude
  const typesArnaquesData = Object.values(
    mockNumeros.reduce((acc, current) => {
      if (current.type_fraude) {
        const typeLabel = current.type_fraude.toUpperCase().replace('_', ' ');
        if (!acc[typeLabel]) {
          acc[typeLabel] = { type: typeLabel, count: 0 };
        }
        acc[typeLabel].count += current.nb_signalements;
      }
      return acc;
    }, {})
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-950 px-4 py-12 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Titre + description */}
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Dashboard <span className="text-orange-500">Analytics</span>
        </h1>
        <p className="text-gray-400 mb-10">
          Vue en temps réel des fraudes signalées au Togo (Total : {mockStats.montant_total.toLocaleString()} FCFA analysés)
        </p>

        {/* GRAPHIQUES : 2 cartes en grille */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 1) Histogramme : Volume des transactions suspectes par date */}
          <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-white font-bold mb-4">
              Volume des transactions récentes (FCFA)
            </h2>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={histogrammeData}>
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="Montant (FCFA)"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 2) Camembert : Répartition des types d’arnaques cumulés */}
          <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-white font-bold mb-4">
              Volume de signalements par Type
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={typesArnaquesData}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ type }) => type}
                  labelLine={true}
                >
                  {typesArnaquesData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "none",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLEAU : top numéros dangereux */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-bold">Top numéros dangereux</h2>
          </div>

          <table className="min-w-[640px] w-full">
            <thead className="bg-gray-800 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Numéro</th>
                <th className="px-6 py-3 text-left">Type de fraude</th>
                <th className="px-6 py-3 text-left">Zone</th>
                <th className="px-6 py-3 text-left">Signalements</th>
                <th className="px-6 py-3 text-left">Score</th>
              </tr>
            </thead>

            <tbody>
              {mockNumeros.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-800 hover:bg-gray-800 transition-all">
                  <td className="px-6 py-4 text-white font-mono">
                    +228 {r.numero}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {r.type_fraude ? r.type_fraude.toUpperCase().replace('_', ' ') : "Aucun"}
                  </td>
                  <td className="px-6 py-4 text-orange-400 font-medium">
                    {r.zone || "Lomé"}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{r.nb_signalements}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-sm ${
                        r.score >= 70
                          ? "bg-red-500/20 text-red-400"
                          : r.score >= 31
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-green-400/20 text-green-400"
                      }`}>
                      {r.score}/100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;