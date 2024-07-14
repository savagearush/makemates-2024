import React from "react";

interface InputProps {
  name: string;
  label: string;
  type: "text" | "password";
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputWithLabel(inputProps: InputProps) {
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor={inputProps.name} className="text-sm font-semibold">
        {inputProps.label}
      </label>
      <input
        {...inputProps}
        className="w-full rounded-md placeholder:text-black/70 px-2 py-2 bg-transparent ring-1 outline-none text-black focus-within:ring-2"
        onChange={(e) => inputProps.onChange(e)}
      />
    </div>
  );
}

export default InputWithLabel;
