const InputField = ({ className, label, id, type, placeholder, options, rows, maxLength, required, nolabel, value, onChange, onFocus, icon}) => {
    const classNameI =`flex shadow appearance-none border rounded w-full py-2 ${icon ? "pl-10" : "pl-3"} pr-3 text-gray-700 leading-tight focus:outline-none focus:outline-2 focus:outline-offset-1 ${className}`
    return (
      <div>
        <label
          className={`block text-violet-950 dark:text-indigo-50 text-sm font-bold mb-2 ${nolabel === true ? "sr-only" : ""}`}
          htmlFor={id}
        >
          {label}
          <span className={`text-red-700 ${required === true ? "" : "hidden"}`}>
            {" "}
            *
          </span>
        </label>
        {icon && <div className="ml-2 mt-3 text-2xl text-indigo-300 absolute">{icon}</div>}
        {type === "textarea" ? (
          <textarea
            className={classNameI}
            id={id}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            required={required ? true : false}
          />
        ) : type === "select" ? (
          <select
            className={classNameI}
            id={id}
            required={required ? true : false}
            onChange={onChange}
            value={value}
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