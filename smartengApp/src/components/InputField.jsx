export function InputField({ label, id, type, placeholder, options, rows, maxLength, required}) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600"
                    id={id}
                    rows={rows}
                    maxLength="150"
                    placeholder={placeholder}
                    required={required ? true : false}
                />
            ) : type === "select" ? (
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600"
                    id={id}
                    required={required ? true : false} 
                >
                    <option value="" className="text-gray-700">{placeholder}</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === "radio" ? (
                options.map((option) => (
                    <div key={option.value}>
                      <input
                        className="shadow appearance-none border rounded focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-2 focus:outline-offset-1 focus:outline-indigo-600"
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    required={required ? true : false}
                />
            ) 
            }
        </div>
    );
}