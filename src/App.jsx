// BrowserRouter : gère la navigation côté client (URL -> composants) en utilisant l’historique du navigateur.
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Navbar : barre de navigation affichée sur toutes les pages.
import Navbar from "./components/Navbar";

// Pages : composants correspondant à chaque route.
import Home from "./pages/Home";
import Signalement from "./pages/Signalement";
import Verification from "./pages/Verification";
import Dashboard from "./pages/Dashboard";

function App() {
  // Le composant App définit :
  // - le contexte de routing (BrowserRouter)
  // - le layout global (fond, texte) + Navbar
  // - les routes (Routes/Route)
  return (
    <BrowserRouter basename="/ShieldTx">
      {/* Layout global : min-h-screen + thème sombre */}
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navigation toujours visible */}
        <Navbar />

        {/* Routes : rend la première Route dont le path correspond */}
        <Routes>
          {/* Route "root" */}
          <Route path="/" element={<Home />} />
          {/* Page de signalement */}
          <Route path="/signalement" element={<Signalement />} />
          {/* Page de vérification */}
          <Route path="/verification" element={<Verification />} />
          {/* Page analytics */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Export du composant principal pour qu’il soit utilisé dans main.jsx.
export default App;

