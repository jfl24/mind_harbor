import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { register } from "../api/auth";

// ------------ Page d'inscription ------------------ //
export function RegisterPage() {
    const navigate = useNavigate();

    // Valeurs des champs du formulaire
    const [email, setEmail] = useState("");
    const [passwordHash, setPasswordHash] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    // Erreur et chargement
    const [erreur, setErreur] = useState("");
    const [chargement, setChargement] = useState(false);

    // Fonction validation du formulaire
    async function handleSubmit() {

        setErreur("");

        if (passwordHash.length < 8) {
            setErreur("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (!/[A-Z]/.test(passwordHash)) {
            setErreur(
                "Le mot de passe doit contenir au moins une lettre majuscule.",
            );
            return;
        }

        if (!/[0-9]/.test(passwordHash)) {
            setErreur(
                "Le mot de passe doit contenir au moins un chiffre.",
            );
            return;
        }

        if (passwordHash !== confirmationPassword) {
            setErreur("Les mots de passe ne correspondent pas.");
            return;
        }

        // Inscription est en cours
        setChargement(true);

        try {
            await register({
                email,
                passwordHash,
            });

            // Après une inscription réussie, on redirige vers Login
            navigate("/login");
        } catch (error) {
            console.error("Erreur inscription :", error);

            setErreur("L'inscription a échoué.");
        } finally {
            setChargement(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">

                <h1 className="login-title">
                    Inscription
                </h1>

                <p className="login-description">
                    Créez votre compte MindHarbor.
                </p>

                <form
                    className="login-form"
                    onSubmit={(event) => {

                        event.preventDefault();

                        // Fonction d'inscription
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

                    {/* Champ pour confirmer le mot de passe */}
                    <InputField
                        label="Confirmer le mot de passe"
                        type="password"
                        name="confirmationPassword"
                        value={confirmationPassword}
                        onChange={(event) =>
                            setConfirmationPassword(event.target.value)
                        }
                        placeholder="Confirmez votre mot de passe"
                        required
                    />

                    {/* Affiche le message seulement s'il y a une erreur */}
                    {erreur && (
                        <p className="input-error-message">
                            {erreur}
                        </p>
                    )}

                    {/* Le texte du bouton change pendant l'inscription */}
                    <Button
                        contenu={chargement ? "Inscription..." : "S'inscrire"}
                        type="submit"
                    />
                </form>

                {/* Lien vers la page de connexion */}
                <div className="register-link">
                    <span>Déjà un compte ?</span>

                    <Link to="/login">
                        Se connecter
                    </Link>
                </div>

            </div>
        </div>
    );
}