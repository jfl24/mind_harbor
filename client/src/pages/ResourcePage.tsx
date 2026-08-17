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
      "https://plus.unsplash.com/premium_photo-1689177356594-b988a1cc45ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW54aSVDMyVBOXQlQzMlQTl8ZW58MHx8MHx8fDA%3D",
    SOMMEIL:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29tbWVpbHxlbnwwfHwwfHx8MA%3D%3D",
    RELATIONS:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVsYXRpb25zfGVufDB8fDB8fHww",
    TRAVAIL:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmFpbHxlbnwwfHwwfHx8MA%3D%3D",
    DEUIL:
      "https://images.unsplash.com/photo-1507126882445-434b04530d1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV1aWx8ZW58MHx8MHx8fDA%3D",
    DEFAULT:
      "https://plus.unsplash.com/premium_photo-1669904021308-567d085a0ee7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhdmFpbHxlbnwwfHwwfHx8MA%3D%3D",
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
