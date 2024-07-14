import { API_ENDPOINT } from "@/axios.config";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

function UpdateCountry({ value }: { value: string }) {
  const [input, setInput] = useState(value);
  const [edit, setEdit] = useState(false);
  const [defaultValue, setDefaultValue] = useState(value);
  const [error, setError] = useState<any>(null);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/user/update`,
        { key: "country", value: input },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDefaultValue(input);
        toast.success(response.data);
      }
    } catch (err) {
      setError(err);
    }

    setEdit(!edit);
  };

  return (
    <div className="space-y-2 border-b-1 border-b-black flex items-center justify-between">
      <label className="font-semibold text-md" htmlFor="name">
        Country
      </label>
      {!edit && (
        <>
          <p className="">{defaultValue}</p>
          <Button onClick={() => setEdit((prev) => !prev)} variant={"link"}>
            Edit
          </Button>
        </>
      )}
      {edit && (
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Enter new Country"
            className="p-1 rounded-lg"
            name="country"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={handleUpdate} variant={"link"}>
            Update
          </Button>
          <Button onClick={() => setEdit(!edit)} variant={"link"}>
            cancel
          </Button>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default UpdateCountry;
