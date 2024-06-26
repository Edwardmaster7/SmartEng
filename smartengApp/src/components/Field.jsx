import { useState } from "react"
import { HiPencilAlt, HiPlusCircle } from "react-icons/hi";
import InputField from "./InputField";

const Field = ({
  fieldName,
  children,
  className,
  editable,
  onSubmit,
  index
}) => {
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [value, setValue] = useState(children);

  return (
    <div
      className={`flex flex-col flex-wrap contain-style ${className}`}
    >
      <div className="flex">
        <label className="font-medium text-inherit text-violet-900 dark:text-violet-50">
          {fieldName}
        </label>
        {editable ? (
          <HiPencilAlt
            className="text-lg ml-1 text-violet-500 hover:text-violet-400"
            onClick={() => setIsEditClicked(!isEditClicked)}
          />
        ) : (
          <></>
        )}
      </div>

      {editable && isEditClicked ? (
        <div className="sticky">
          <InputField
            id="add-item-input"
            className="rounded-lg bg-violet-50 dark:bg-violet-100 focus:outline-indigo-200 mb-2"
            placeholder={children}
            type="text"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <HiPlusCircle
            id="add-item-button"
            className="text-2xl text-violet-900 hover:text-green-600 absolute top-3.5 right-2"
            onClick={(e) => {
              e.stopPropagation();
              if (index >= 0) {
                onSubmit(index, value);
              } else {
                onSubmit(value);
              }
              setIsEditClicked(!isEditClicked);
            }}
          />
        </div>
      ) : (
        <span className="text-inherit opacity-80 text-violet-900 dark:text-violet-50 overflow-auto">
          {children}
        </span>
      )}
    </div>
  );
};

export default Field;