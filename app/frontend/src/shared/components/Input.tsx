type InputProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  onChange: (value: string) => void;
};

export function Input({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  error,
  helperText,
  onChange,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-red-500"
        }`}
      />

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}