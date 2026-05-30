import { rapports, statsData, typesArnaques } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-extrabold text-white mb-2">
          Dashboard <span className="text-orange-500">Analytics</span>
        </h1>
        <p className="text-gray-400 mb-10">Vue en temps réel des fraudes signalées au Togo</p>

        {/* GRAPHIQUES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-white font-bold mb-4">Signalements par mois</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statsData}>
                <XAxis dataKey="mois" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none", color: "#fff" }} />
                <Bar dataKey="signalements" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-white font-bold mb-4">Types d'arnaques</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
              <Pie data={typesArnaques} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={70} label={({ type }) => type} labelLine={true}>
                  {typesArnaques.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TABLEAU */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-bold">Top numéros dangereux</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-800 text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Numéro</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Zone</th>
                <th className="px-6 py-3 text-left">Signalements</th>
                <th className="px-6 py-3 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {rapports.map((r, i) => (
                <tr key={i} className="border-t border-gray-800 hover:bg-gray-800 transition-all">
                  <td className="px-6 py-4 text-white font-mono">{r.numero}</td>
                  <td className="px-6 py-4 text-gray-300">{r.type}</td>
                  <td className="px-6 py-4 text-gray-300">{r.zone}</td>
                  <td className="px-6 py-4 text-gray-300">{r.signalements}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                      r.score >= 70 ? "bg-red-500/20 text-red-400" :
                      r.score >= 31 ? "bg-yellow-400/20 text-yellow-400" :
                      "bg-green-400/20 text-green-400"
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