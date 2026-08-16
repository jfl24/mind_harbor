import { useState } from "react";

import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/auth";


// ------------ Page de connexion ------------------ //
export function LoginPage() {

  // Pour enregistrer le token
  const { seConnecter } = useAuth();

  // valeurs des champs du formulaire
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

      // Token récupéré du backend et authcontext le sauvegarde dans localStorage
      seConnecter(response.data.tokenAcces);

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

        <h1>Connexion</h1>

        <p>
          Connectez-vous à votre compte MindHarbor.
        </p>

        <form
          onSubmit={(event) => {
            // Empeche le navigateur de recharger la page
            event.preventDefault();

            // On lance notre fonction de connexion
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

      </div>

    </div>
  );
}