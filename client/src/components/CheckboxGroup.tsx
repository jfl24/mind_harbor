export interface CheckboxOption {
  id: number;
  label: string;
}

interface CheckboxroupProps {
  label?: string;
  options: CheckboxOption[];
  selectedIds: number[];
  onChange: (newSelectedIds: number[]) => void;
  erreur?: string;
}

export function CheckboxGroup({
  label,
  options,
  selectedIds,
  onChange,
  erreur,
}: CheckboxroupProps) {
  const handleToggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="checkbox-group-container">
      {label && <label className="checkbox-group-label">{label}</label>}
      <div className="checkbox-grid">
        {options.map((option) => {
          const isChecked = selectedIds.includes(option.id);

          return (
            <label
              key={option.id}
              className={`checkbox-card ${isChecked ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option.id)}
                className="checkbox-input"
              />
              <span className="checkbox-test">{option.label}</span>
            </label>
          );
        })}
      </div>
      {erreur && <span className="input-error-message">{erreur}</span>}
    </div>
  );
}
