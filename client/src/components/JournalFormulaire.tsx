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
import { CheckboxGroup } from "./CheckboxGroup";

function PostJournal() {
  const { estConnecte } = useAuth();
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
  const [options, setOptions] = useState<Activity[]>([]);

  useEffect(() => {
    async function chargerActivities() {
      try {
        const liste = await getActivities();
        setOptions(liste);
      } catch (err) {
        setErreur("Erreur dans le chargement de la liste des activités.");
      }
    }
  });

  async function soumettre(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");

    if (!estConnecte) {
      setErreur(
        "Veuillez vous connecter avant d'envoyer cette entrée vers votre journal.",
      );
      return;
    }

    try {
      const res = await postEntreeJournal(journalData);
    } catch (erreur) {
      setErreur("Oups!  Une erreur inattendue est survenue.");
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

      <Button contenu="Enregistrer" type="submit" />
      <p>{erreur}</p>
    </form>
  );
}

export default PostJournal;
