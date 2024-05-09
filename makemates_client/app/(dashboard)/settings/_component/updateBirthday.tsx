import { Button } from "@/components/ui/button";
import axios from "axios";
import moment from "moment";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

function UpdateBirthday({ value }: { value: string }) {
  value = moment(value).format("DD MMM YYYY");

  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [defaultValue, setDefaultValue] = useState(value);
  const [error, setError] = useState<any>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/update",
        { key: "birthday", value: input },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data);
        setDefaultValue(input);
      }
    } catch (err) {
      setError(err);
    }

    setEdit(!edit);
  };

  return (
    <div className="space-y-2 border-b-1 border-b-black flex items-center justify-between">
      <label className="font-semibold text-md" htmlFor="name">
        Birthday
      </label>
      {!edit && (
        <>
          <p ref={nameRef} className="">
            {defaultValue}
          </p>
          <Button onClick={() => setEdit((prev) => !prev)} variant={"link"}>
            Edit
          </Button>
        </>
      )}
      {edit && (
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="eg. 12 May 2000"
            className="p-1 rounded-lg"
            name="dob"
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

export default UpdateBirthday;
