import { type InputHTMLAttributes } from "react";

// L'interface qu'on crée pour les input hérite de l'interface de base pour les input en HTML.
// Je préférais faire mes propres interfaces à partir de 0, mais ça semble compliqué pour les input.
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  erreur?: string;
}

export function InputField({
  label,
  erreur,
  id,
  className = "input-field",
  ...props
}: InputFieldProps) {
  const inputId = id || props.name;

  return (
    <div className="input-container">
      {label /*Le label devant le champ d'input */ && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input // Le champ pour l'input //
        id={inputId}
        className={`input-field ${erreur ? "input-error" : ""} ${className}`} // On vérifie s'il y a une erreur pour déterminer le style
        {...props}
      />
      {erreur && <span className="input-error-message">{erreur}</span>}{" "}
      {/* S'il y a une erreur, on prépare un endroit pour le message */}
    </div>
  );
}
