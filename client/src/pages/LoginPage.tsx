import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/auth";

// ------------ Page de connexion ------------------ //
export function LoginPage() {
  // Permet de sauvegarder le token après la connexion
  const { seConnecter } = useAuth();

  // Permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate();

  // Valeurs des champs du formulaire
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");

  // Permet d'afficher une erreur et l'état de chargement
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  // Fonction appelée lorsque l'utilisateur valide le formulaire
  async function handleSubmit() {
    // On supprime une ancienne erreur
    setErreur("");

    // On indique que la connexion est en cours
    setChargement(true);

    try {
      const response = await login({
        email,
        passwordHash,
      });

      // Token récupéré du backend et sauvegardé dans le AuthContext
      seConnecter(response.data.tokenAcces);

      // Après une connexion réussie, on redirige vers l'espace utilisateur
      navigate("/accueil");
    } catch (error) {
      console.error("Erreur login :", error);

      setErreur("La connexion a échoué.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="login-title">
          Connexion
        </h1>

        <p className="login-description">
          Connectez-vous à votre compte MindHarbor.
        </p>

        <form
          className="login-form"
          onSubmit={(event) => {
            // Empêche le navigateur de recharger la page
            event.preventDefault();

            // Lance la fonction de connexion
            handleSubmit();
          }}
        >
          {/* Champ pour saisir le courriel */}
          <InputField
            label="Courriel"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Votre courriel"
            required
          />

          {/* Champ pour saisir le mot de passe */}
          <InputField
            label="Mot de passe"
            type="password"
            name="passwordHash"
            value={passwordHash}
            onChange={(event) => setPasswordHash(event.target.value)}
            placeholder="Votre mot de passe"
            required
          />

          {/* Affiche le message seulement s'il y a une erreur */}
          {erreur && (
            <p className="input-error-message">
              {erreur}
            </p>
          )}

          {/* Le texte du bouton change pendant la connexion */}
          <Button
            contenu={chargement ? "Connexion..." : "Se connecter"}
            type="submit"
          />
        </form>

        {/* Lien vers la page d'inscription */}
        <div className="register-link">
          <span>Pas encore de compte ?</span>

          <Link to="/register">
            S'inscrire
          </Link>
        </div>

      </div>
    </div>
  );
}