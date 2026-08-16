import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccueilUtilisateurPage } from "./pages/AccueilUtilisateurPage";
import { JournalPage } from "./pages/JournalPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Page d'accueil publique */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Page de connexion */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Page d'inscription */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Accueil de l'utilisateur connecté */}
        <Route
          path="/accueil"
          element={<AccueilUtilisateurPage />}
        />

        {/* Page du journal */}
        <Route
          path="/journal"
          element={<JournalPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;