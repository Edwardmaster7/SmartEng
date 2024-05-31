const InputField = ({ className, label, id, type, placeholder, options, rows, maxLength, required, nolabel, value, onChange, onFocus}) => {
    const classNameI =`flex shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-2 focus:outline-offset-1 ${className}`
    return (
      <div>
        <label
          className={`block text-indigo-950 text-sm font-bold mb-2 ${nolabel === true ? "sr-only" : ""}`}
          htmlFor={id}
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            className={classNameI}
            id={id}
            rows={rows}
            maxLength="150"
            placeholder={placeholder}
            required={required ? true : false}
          />
        ) : type === "select" ? (
          <select
            className={classNameI}
            id={id}
            required={required ? true : false}
            onChange={onChange}
          >
            <option value="" className="text-gray-700">
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "radio" ? (
          options.map((option) => (
            <div key={option.value}>
              <input
                className={classNameI}
                id={id}
                type="radio"
                name={id}
                value={option.value}
                required={required ? true : false}
              />
              <label htmlFor={id}>{option.label}</label>
            </div>
          ))
        ) : (
          <input
            className={classNameI}
            id={id}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            required={required ? true : false}
          />
        )}
      </div>
    );
}

export default InputField;