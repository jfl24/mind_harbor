import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { postEntreeJournal, getActivities } from "../api/journal";
import {
  type CreateJournalRequest,
  type Activity,
} from "../../../shared/types";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { SliderField } from "./SliderField";
import { TextArea } from "./TextArea";
import { CheckboxGroup, type CheckboxOption } from "./CheckboxGroup";

function PostJournal() {
  const { estConnecte } = useAuth();
  const [estSoumis, setEstSoumis] = useState(false);
  const [journalData, setJournalData] = useState<CreateJournalRequest>({
    date: new Date().toISOString().split("T")[0], // On sort la date du format UTC
    humeur: 5,
    energie: 5,
    sommeil: 5,
    anxiete: 5,
    activities: [],
    evenements: "",
    gratitude: "",
  });
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(true);
  const [selectedActitityIds, setSelectedActivityIds] = useState<number[]>([]);
  const [options, setOptions] = useState<CheckboxOption[]>([]);

  useEffect(() => {
    async function chargerActivities() {
      try {
        const liste = await getActivities();
        const optionsFormatted = liste.map((activity) => ({
          id: activity.id,
          label: activity.name,
        })); // Pour obtenir seulement les noms des activiités
        setOptions([{ id: 0, label: "Aucune" }, ...optionsFormatted]); // Pour ajouter l'option de ne faire aucune activité
      } catch (err) {
        setErreur("Erreur dans le chargement de la liste des activités.");
      } finally {
        setChargement(false);
      }
    }
    chargerActivities();
    setChargement(true);
  }, []);

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    if (!estConnecte) {
      setErreur(
        "Veuillez vous connecter avant d'envoyer cette entrée vers votre journal.",
      );
      return;
    }

    try {
      const activitesAEnvoyer = selectedActitityIds.filter((id) => id !== 0); // Parce que l'activité Aucune n'existe pas en BDD

      const payload = {
        ...journalData,
        activities: activitesAEnvoyer,
      };
      await postEntreeJournal(payload);
      setEstSoumis(true);
    } catch (erreur) {
      setErreur("Oups!  Une erreur inattendue est survenue.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <form onSubmit={soumettre}>
      <h2>Votre entrée de journal du jour</h2>
      <h3>Tout sera enregistré de façon confidentielle</h3>
      <SliderField
        label="Humeur (1 à 5)"
        name="humeur"
        min={1}
        max={5}
        step={1}
        value={journalData.humeur}
        onChange={(e) =>
          setJournalData({
            ...journalData,
            humeur: Math.round(Number(e.target.value)),
          })
        }
      />
      <SliderField
        label="Énergie (1 à 5)"
        name="energie"
        min={1}
        max={5}
        step={1}
        value={journalData.energie}
        onChange={(e) =>
          setJournalData({
            ...journalData,
            energie: Math.round(Number(e.target.value)),
          })
        }
      />
      <SliderField
        label="Sommeil (1 à 5)"
        name="sommeil"
        min={1}
        max={5}
        step={1}
        value={journalData.sommeil}
        onChange={(e) =>
          setJournalData({
            ...journalData,
            sommeil: Math.round(Number(e.target.value)),
          })
        }
      />
      <SliderField
        label="Anxiété (1 à 5)"
        name="anxiete"
        min={1}
        max={5}
        step={1}
        value={journalData.anxiete}
        onChange={(e) =>
          setJournalData({
            ...journalData,
            anxiete: Math.round(Number(e.target.value)),
          })
        }
      />
      <CheckboxGroup
        label="Activités faites aujourd'hui : "
        options={options}
        selectedIds={selectedActitityIds}
        onChange={(newIds) => {
          if (newIds.includes(0) && newIds.length > 1) {
            setSelectedActivityIds(newIds.filter((id) => id !== 0)); // Si des activités sont choisies, on enlève l'option Aucune
          } else {
            setSelectedActivityIds(newIds);
          }
        }}
        erreur={erreur}
      />
      <TextArea
        label="Vous est-il arrivé des événements particuliers aujourd'hui dont vous voulez vous rappeler ?"
        erreur=""
        name="evenements"
      />
      <TextArea
        label="Avez-vous eu de la gratitude pour quelque chose aujourd'hui ?"
        erreur=""
        name="gratitude"
      />
      <Button contenu="Enregistrer" type="submit" />
      <p>{erreur}</p>
    </form>
  );
}

export default PostJournal;
