import { type TextareaHTMLAttributes } from "react";

// L'interface qu'on crée pour les input hérite de l'interface de base pour les input en HTML.
// Je préférais faire mes propres interfaces à partir de 0, mais ça semble compliqué pour les input.
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  erreur?: string;
}

export function TextArea({
  label,
  erreur,
  id,
  rows = 7,
  cols = 35,
  className = "text-area-field",
  ...props
}: TextAreaProps) {
  const textAreaId = id || props.name;

  return (
    <div className="text-area-container">
      {label /*Le label devant le champ de textArea */ && (
        <label htmlFor={textAreaId} className="text-area-label">
          {label}
        </label>
      )}
      <div>
        <textarea // Le champ pour l'input //
          id={textAreaId}
          className={`text-area-field ${erreur ? "text-area-error" : ""} ${className}`} // On vérifie s'il y a une erreur pour déterminer le style
          {...props}
        />
      </div>
      {erreur && <span className="text-area-error-message">{erreur}</span>}{" "}
      {/* S'il y a une erreur, on prépare un endroit pour le message */}
    </div>
  );
}
