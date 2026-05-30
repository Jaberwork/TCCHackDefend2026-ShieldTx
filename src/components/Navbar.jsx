import { Link, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Accueil" },
    { path: "/signalement", label: "Signaler" },
    { path: "/verification", label: "Vérifier" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-gray-900 border-b border-orange-500 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-orange-500" size={28} />
        <span className="text-xl font-bold text-white">Shield<span className="text-orange-500">Tx</span></span>
      </div>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors ${
              location.pathname === link.path
                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;