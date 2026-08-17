import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AccueilUtilisateurPage } from "./pages/AccueilUtilisateurPage";
import { JournalPage } from "./pages/JournalPage";
import { GroupPage } from "./pages/GroupPage";
import ResourcePage from "./pages/ResourcePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil publique */}
        <Route path="/" element={<HomePage />} />

        {/* Page de connexion */}
        <Route path="/login" element={<LoginPage />} />

        {/* Page d'inscription */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Accueil de l'utilisateur connecté */}
        <Route path="/accueil" element={<AccueilUtilisateurPage />} />

        {/* Page du journal */}
        <Route path="/journal" element={<JournalPage />} />

        {/* Page des groupes */}
        <Route path="/groupes" element={<GroupPage />} />

        {/* Page des ressources */}
        <Route path="/ressources" element={<ResourcePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
