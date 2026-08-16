import { Link } from "react-router-dom";
import homeImage from "../assets/mindharbor-home.png";

export function HomePage() {
  return (
    <main className="home-page">

      {/* Bouton de connexion */}
      <Link to="/login" className="home-login-button">
        Se connecter
      </Link>

      {/* Image de présentation */}
      <div className="home-hero">
        <img
          src={homeImage}
          alt="MindHarbor - plateforme de bien-être"
          className="home-image"
        />
      </div>

    </main>
  );
}