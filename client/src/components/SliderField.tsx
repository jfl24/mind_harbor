import { type InputHTMLAttributes } from "react";

interface SliderFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
  min?: number;
  max?: number;
  step?: number;
}
// La structure pour définir un sliderField

export function SliderField({
  label,
  value = 3,
  min = 1,
  max = 5,
  step = 1,
  onChange,
  id,
  className = "",
  ...props
}: SliderFieldProps) {
  const inputId = id || props.name;

  // Pour générer une liste d'entiers de 1 à 5
  const stepInt = Math.max(1, Math.round(step));
  const options = [];
  for (let i = min; i <= max; i += stepInt) {
    options.push(i);
  }

  return (
    <div className="slider-field-container">
      <div className="slider-header">
        <label htmlFor={inputId} className="slider-label">
          {label}
        </label>
        <span className="slider-value-badge">
          {Number(value)} / {max}
        </span>
      </div>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`slider-input ${className}`}
        {...props}
      />
      <div className="slider-ticks">
        {options.map((num) => (
          <span
            key={num}
            className={`slider-tick-item ${Number(value) === num ? "active" : ""}`}
          >
            {num}
          </span>
        ))}
      </div>
    </div>
  );
}
