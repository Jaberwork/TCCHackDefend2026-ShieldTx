// Link : navigation SPA (sans rechargement page).
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Icônes de marque et menu.
import { Menu, ShieldCheck, X } from "lucide-react";

function Navbar() {
  // useLocation : permet de récupérer l’URL actuelle.
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Définition des liens (path -> label).
  const links = [
    { path: "/", label: "Accueil" },
    { path: "/signalement", label: "Signaler" },
    { path: "/verification", label: "Vérifier" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-gray-900 border-b border-orange-500 px-4 py-3 md:px-6 md:py-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        {/* Zone gauche : logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <ShieldCheck className="text-orange-500" size={28} />
          <span className="text-xl font-bold text-white">
            Shield<span className="text-orange-500">Tx</span>
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden gap-6 md:flex">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Bouton burger mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 text-gray-200 hover:border-orange-500 hover:text-orange-500 md:hidden"
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="mt-3 flex flex-col gap-2 border-t border-gray-800 pt-3 md:hidden">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  active
                    ? "bg-orange-500/10 text-orange-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

