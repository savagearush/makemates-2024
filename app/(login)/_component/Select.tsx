import React from "react";

interface SelectProps {
  name: string;
  label: string;
  data: Array<any>;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ name, label, data, onSelectChange }: SelectProps) {
  return (
    <select
      className="p-2 ring-1 bg-transparent text-sm text-black rounded-md"
      name={name}
      defaultValue="none"
      onChange={onSelectChange}
    >
      <option value="none" disabled>
        {label}
      </option>
      {data.map((item, index) => {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
