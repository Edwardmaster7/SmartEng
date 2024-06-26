import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import React, { useState } from "react";

const InputField = ({
  className,
  label,
  id,
  type,
  placeholder,
  pattern,
  min,
  max,
  options,
  rows,
  maxLength,
  required,
  nolabel,
  value,
  onChange,
  onFocus,
  icon,
  accept,
}) => {
  const classNameI = `flex shadow appearance-none border rounded w-full py-2 ${icon ? "pl-10" : "pl-3"} ${type === "password" ? "pr-10" : ""} pr-3 text-gray-700 leading-tight focus:outline-none focus:outline-2 focus:outline-offset-1 ${className}`;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        className={`mb-2 block text-sm font-bold text-violet-950 dark:text-indigo-50 ${nolabel === true ? "sr-only" : ""}`}
        htmlFor={id}
      >
        {label}
        <span className={`text-red-700 ${required === true ? "" : "hidden"}`}>
          {" "}
          *
        </span>
      </label>
      {icon && (
        <div className="absolute ml-2 mt-3 text-2xl text-indigo-300">
          {icon}
        </div>
      )}

      {type === "textarea" ? (
        <textarea
          className={classNameI}
          id={id}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
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
      ) : type === "password" ? (
        <div className="relative">
          {icon && (
            <div className="absolute ml-2 mt-3 text-2xl text-indigo-300">
              {icon}
            </div>
          )}
          <input
            className={classNameI}
            id={id}
            type={showPassword ? "text" : "password"}
            required={required ? true : false}
            onChange={onChange}
            value={value}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {!showPassword && type === "password" && (
              <HiEye
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-2xl text-indigo-300"
              />
            )}
            {showPassword && type === "password" && (
              <HiEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-2xl text-indigo-300"
              />
            )}
          </div>
        </div>
      ) : (
        <input
          className={classNameI}
          id={id}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          min={min}
          max={max}
          pattern={pattern}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          required={required ? true : false}
          accept={accept}
        />
      )}
    </div>
  );
};

export default InputField;
