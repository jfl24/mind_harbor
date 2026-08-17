import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import wellbeingImage from "../assets/mindharbor-wellbeing.png";

// ------------ Accueil utilisateur ------------------ //
export function AccueilUtilisateurPage() {
    const { seDeconnecter } = useAuth();
    const navigate = useNavigate();

    function handleDeconnexion() {
        // fonction pour se déconnecter
        seDeconnecter();

        // Retour à la page de connexion
        navigate("/login");
    }
    return (
        <div className="user-home-page">

            {/* Barre de navigation */}
            <nav className="navbar">

                {/* Logo / nom de la plateforme */}
                <div className="navbar-logo">
                    MindHarbor
                </div>

                {/* Liens vers les différentes fonctionnalités */}
                <div className="navbar-links">

                    <Link to="/accueil">
                        Accueil
                    </Link>

                    <Link to="/journal">
                        Mon journal
                    </Link>

                    <Link to="/tendances">
                        Mes tendances
                    </Link>

                    <Link to="/ressources">
                        Ressources
                    </Link>

                    <Link to="/favoris">
                        Favoris
                    </Link>

                    <Link to="/groupes">
                        Groupes
                    </Link>

                    <Link to="/messages">
                        Messages
                    </Link>

                </div>

                {/* Accès au profil et déconnexion*/}
                <div className="navbar-profile">

                    <Link to="/profil">
                        Mon profil
                    </Link>

                    <button
                        onClick={handleDeconnexion}
                        className="logout-button"
                    >
                        Déconnexion
                    </button>

                </div>

            </nav>


            {/* Contenu principal */}
            <main className="user-home-content">

                {/* Message de bienvenue */}
                <section className="welcome-section">

                    <h1>
                        Bienvenue sur MindHarbor 👋
                    </h1>

                    <p>
                        Votre espace personnel pour suivre votre bien-être,
                        comprendre votre évolution et trouver des ressources
                        adaptées à vos besoins.
                    </p>

                </section>


                {/* Présentation des fonctionnalités */}
                <section className="features-section">

                    <h2>
                        Que souhaitez-vous faire ?
                    </h2>

                    <p className="features-introduction">
                        MindHarbor vous permet de suivre votre bien-être
                        au quotidien, de consulter vos tendances et
                        d'échanger avec une communauté.
                    </p>


                    <div className="features-grid">

                        {/* Journal */}
                        <Link
                            to="/journal"
                            className="feature-card"
                        >
                            <span className="feature-icon">
                                📔
                            </span>

                            <h3>
                                Mon journal
                            </h3>

                            <p>
                                Notez votre humeur, votre énergie, votre sommeil
                                et votre niveau d'anxiété au quotidien.
                            </p>
                        </Link>


                        {/* Tendances */}
                        <Link
                            to="/tendances"
                            className="feature-card"
                        >
                            <span className="feature-icon">
                                📈
                            </span>

                            <h3>
                                Mes tendances
                            </h3>

                            <p>
                                Visualisez l'évolution de votre bien-être
                                grâce à vos données et à des graphiques.
                            </p>
                        </Link>


                        {/* Ressources */}
                        <Link
                            to="/ressources"
                            className="feature-card"
                        >
                            <span className="feature-icon">
                                📚
                            </span>

                            <h3>
                                Ressources
                            </h3>

                            <p>
                                Découvrez des ressources d'aide et de bien-être
                                adaptées aux différentes situations.
                            </p>
                        </Link>


                        {/* Favoris */}
                        <Link
                            to="/favoris"
                            className="feature-card"
                        >
                            <span className="feature-icon">
                                ❤️
                            </span>

                            <h3>
                                Mes favoris
                            </h3>

                            <p>
                                Retrouvez facilement les ressources que
                                vous souhaitez conserver.
                            </p>
                        </Link>


                        {/* Groupes */}
                        <Link
                            to="/groupes"
                            className="feature-card"
                        >
                            <span className="feature-icon">
                                👥
                            </span>

                            <h3>
                                Groupes de soutien
                            </h3>

                            <p>
                                Rejoignez des groupes et échangez avec
                                d'autres membres de la communauté.
                            </p>
                        </Link>


                        {/* Messages */}
                        <Link
                            to="/messages"
                            className="feature-card"
                        >
                            <span className="feature-icon">
                                💬
                            </span>

                            <h3>
                                Messages
                            </h3>

                            <p>
                                Consultez vos conversations et échangez
                                avec les autres utilisateurs.
                            </p>
                        </Link>

                    </div>

                </section>


                {/* Section de présentation de MindHarbor */}
                <section className="about-section">

                    <div className="about-text">

                        <h2>
                            Prenez soin de votre bien-être
                        </h2>

                        <p>
                            MindHarbor vous accompagne dans votre quotidien
                            en vous permettant de mieux comprendre votre
                            état de bien-être et de suivre son évolution.
                        </p>

                        <p>
                            Votre journal et vos tendances vous permettent
                            de prendre du recul sur vos habitudes, tandis
                            que les ressources et la communauté vous offrent
                            différents moyens de trouver du soutien.
                        </p>

                    </div>


                    {/* Image de présentation */}
                    <div className="about-image">

                        <img
                            src={wellbeingImage}
                            alt="Bien-être et accompagnement MindHarbor"
                        />

                    </div>

                </section>

            </main>

        </div>
    );
}