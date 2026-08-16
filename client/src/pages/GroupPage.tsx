import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/axios";

type Group = {
  id: number;
  nom: string;
  description: string;
  thematique?: string;
  regles?: string;
  groupVisibility?: string;
};

export function GroupPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);

  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  // Formulaire de création
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [visibilite, setVisibilite] = useState("PUBLIC");
  const [creationEnCours, setCreationEnCours] = useState(false);

  // ========================================================
  // Lister les groupes
  // ========================================================

  async function chargerGroupes() {
    try {
      setErreur("");
      setChargement(true);

      const response = await api.get("/groups", {
        params: recherche.trim()
          ? { q: recherche.trim() }
          : {},
      });

      setGroups(response.data);
    } catch (error) {
      console.error("Erreur récupération groupes :", error);
      setErreur("Impossible de charger les groupes.");
    } finally {
      setChargement(false);
    }
  }

  // Charger les groupes au démarrage
  useEffect(() => {
    chargerGroupes();
  }, []);

  // ========================================================
  // Rechercher un groupe
  // ========================================================

  async function rechercher(event: React.SubmitEvent) {
    event.preventDefault();

    await chargerGroupes();
  }

  // ========================================================
  // Créer un groupe
  // ========================================================

  async function creerGroupe(event: React.SubmitEvent) {
    event.preventDefault();

    if (!nom.trim()) {
      setErreur("Le nom du groupe est obligatoire.");
      return;
    }

    if (!description.trim()) {
      setErreur("La description du groupe est obligatoire.");
      return;
    }

    try {
      setErreur("");
      setSucces("");
      setCreationEnCours(true);

      // Données correspondant au schéma Zod du backend
      await api.post("/groups", {
        nom: nom.trim(),
        description: description.trim(),
        groupVisibility: visibilite,
      });

      // Réinitialisation du formulaire
      setNom("");
      setDescription("");
      setVisibilite("PUBLIC");

      // Message de succès
      setSucces("Le groupe a été créé avec succès.");

      // Actualiser la liste
      await chargerGroupes();

    } catch (error) {
      console.error("Erreur création groupe :", error);

      setErreur("Impossible de créer le groupe.");
    } finally {
      setCreationEnCours(false);
    }
  }

  return (
    <div className="group-page">

      {/* ====================================================
          NAVBAR
          ==================================================== */}

      <nav className="navbar">

        <div className="navbar-logo">
          MindHarbor
        </div>

        <div className="navbar-links">

          <Link to="/accueil">
            Accueil
          </Link>

          <Link to="/journal">
            Mon journal
          </Link>

          <Link to="/groupes">
            Groupes
          </Link>

        </div>

        <div className="navbar-profile">

          <Link to="/profil">
            Mon profil
          </Link>

        </div>

      </nav>


      {/* ====================================================
          CONTENU PRINCIPAL
          ==================================================== */}

      <main className="group-content">

        {/* Présentation */}
        <header className="group-header">

          <h1>
            Groupes de soutien
          </h1>

          <p>
            Découvrez les groupes de la communauté MindHarbor
            et rejoignez les espaces qui vous intéressent.
          </p>

        </header>


        {/* ==================================================
            RECHERCHE
            ================================================== */}

        <section className="group-search-card">

          <h2>
            Rechercher un groupe
          </h2>

          <form
            className="group-search-form"
            onSubmit={rechercher}
          >

            <input
              type="text"
              value={recherche}
              onChange={(event) =>
                setRecherche(event.target.value)
              }
              placeholder="Nom du groupe..."
              className="group-input"
            />

            <button
              type="submit"
              className="button-app"
            >
              Rechercher
            </button>

          </form>

        </section>


        {/* ==================================================
            CRÉATION D'UN GROUPE
            ================================================== */}

        <section className="group-create-card">

          <h2>
            Créer un groupe
          </h2>

          <form onSubmit={creerGroupe}>

            {/* Nom */}
            <div className="input-container">

              <label className="input-label">
                Nom du groupe
              </label>

              <input
                className="input-field"
                type="text"
                value={nom}
                onChange={(event) =>
                  setNom(event.target.value)
                }
                placeholder="Ex. Gestion du stress"
                required
              />

            </div>


            {/* Description */}
            <div className="input-container">

              <label className="input-label">
                Description
              </label>

              <textarea
                className="group-textarea"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Décrivez le groupe..."
                rows={4}
                required
              />

            </div>


            {/* Visibilité */}
            <div className="input-container">

              <label className="input-label">
                Visibilité
              </label>

              <select
                className="group-select"
                value={visibilite}
                onChange={(event) =>
                  setVisibilite(event.target.value)
                }
              >

                <option value="PUBLIC">
                  Public
                </option>

                <option value="PRIVE">
                  Privé
                </option>

              </select>

            </div>


            {/* Message d'erreur */}
            {erreur && (
              <p className="input-error-message">
                {erreur}
              </p>
            )}


            {/* Message de succès */}
            {succes && (
              <p className="group-success-message">
                {succes}
              </p>
            )}


            {/* Bouton de création */}
            <button
              type="submit"
              className="button-app"
              disabled={creationEnCours}
            >
              {creationEnCours
                ? "Création..."
                : "Créer le groupe"}
            </button>

          </form>

        </section>


        {/* ==================================================
            LISTE DES GROUPES
            ================================================== */}

        <section className="groups-section">

          <h2>
            Groupes disponibles
          </h2>

          {chargement ? (

            <p>
              Chargement des groupes...
            </p>

          ) : groups.length === 0 ? (

            <p>
              Aucun groupe trouvé.
            </p>

          ) : (

            <div className="groups-grid">

              {groups.map((group) => (

                <article
                  key={group.id}
                  className="group-card"
                >

                  <div className="group-icon">
                    👥
                  </div>

                  <h3>
                    {group.nom}
                  </h3>

                  <p>
                    {group.description ||
                      "Aucune description disponible."}
                  </p>

                  <span className="group-visibility">

                    {group.groupVisibility === "PRIVE"
                      ? "🔒 Groupe privé"
                      : "🌍 Groupe public"}

                  </span>

                  <button
                    type="button"
                    className="button-app"
                  >
                    Voir le groupe
                  </button>

                </article>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}