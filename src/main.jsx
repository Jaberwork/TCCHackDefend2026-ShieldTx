// StrictMode : aide à détecter des effets de bord / bugs potentiels en développement.
import { StrictMode } from 'react'

// createRoot : point d’entrée React 18 pour attacher l’app à la div #root.
import { createRoot } from 'react-dom/client'

// Import du CSS global (ici Tailwind via index.css).
import './index.css'

// Composant principal de l’application (routing, layout, etc.).
import App from './App.jsx'

// On “monte” (render) l’application dans l’élément HTML ayant l’id="root".
createRoot(document.getElementById('root')).render(
  // StrictMode : comportement plus strict en dev (aide à repérer des problèmes tôt).
  <StrictMode>
    {/* <App /> : composant principal */}
    <App />
  </StrictMode>,
)





