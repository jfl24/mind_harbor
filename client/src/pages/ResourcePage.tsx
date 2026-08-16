import { useState, useEffect } from "react";
import { getResources } from "../api/resources";
import "../App.css";
import "../components/ResourceCard.css";
import { ResourceCard } from "../components/ResourceCard";
import {
  type Resource,
  type ResourceListResponse,
  type ResourceCategory,
} from "../../../shared/types/resource";

function ResourcePage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    async function obtenirResources() {
      try {
        const liste = await getResources();
        setResources(liste);
      } catch (erreur) {
        setErreur("Erreur lors du chargement des ressources.");
      } finally {
        setChargement(false);
      }
    }
    obtenirResources();
  }, []);

  if (chargement) return <p>Chargement en cours...</p>;
  if (erreur) return <p>{erreur}</p>;

  const IMAGES_PAR_CATEGORIE: Record<string, string> = {
    ANXIETE:
      "https://unsplash.com/fr/photos/un-homme-tient-ses-cheveux-en-lair-vf7NiRQtLxE",
    SOMMEIL:
      "https://unsplash.com/fr/photos/white-cat-sleeps-under-white-comforter-uy5t-CJuIK4",
    RELATIONS:
      "https://unsplash.com/fr/photos/four-person-hands-wrap-around-shoulders-while-looking-at-sunset-PGnqT0rXWLs",
    TRAVAIL:
      "https://unsplash.com/fr/photos/people-sitting-down-near-table-with-assorted-laptop-computers-SYTO3xs06fU",
    DEUIL:
      "https://unsplash.com/fr/photos/deux-colombes-blanches-en-vol-6XcziMmkNgQ",
    DEFAULT:
      "https://unsplash.com/fr/photos/femme-daffaires-asiatique-assise-dans-un-bureau-et-verifiant-les-informations-sur-un-document-financier-ctJtMl1eveY",
  };

  return (
    <div>
      <h2 className="resource-title"> Ressources disponibles </h2>
      <div className="resource-card-container">
        {resources.map((r) => {
          const imageAfficher =
            IMAGES_PAR_CATEGORIE[r.categorie] || IMAGES_PAR_CATEGORIE.DEFAULT;
          return (
            <ResourceCard
              key={r.id}
              titre={r.titre}
              description={r.description}
              imageUrl={imageAfficher}
              type={r.type}
              categorie={r.categorie}
              url={r.url}
              children=""
              duree={r.duree}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ResourcePage;
