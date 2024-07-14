import { Button } from "@/components/ui/button";
import React, { FormEvent, useContext, useRef, useState } from "react";
import InputWithLabel from "./InputWithLabel";
import Select from "./Select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AuthContextType, SignUpInputType } from "@/typings";
import { CreateNewUser } from "@/axios.config";
import { AuthContext } from "@/context/AuthContext";

function Signup() {
  const { userSignUp }: any = useContext<AuthContextType | null>(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    day: "",
    month: "",
    year: "",
  });

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const gender = ["male", "female", "other"];
  const years = getArray(1950, 2023);

  const handleSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userSignUp(inputs);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Dialog>
      <DialogTrigger>Click here</DialogTrigger>
      <DialogContent>
        <div>
          <h3 className="font-semibold text-xl">Sign Up Now</h3>
          <p>Your mates are waiting...</p>
        </div>
        <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-3">
          <InputWithLabel
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your full name"
            onChange={onInputChange}
          />
          <InputWithLabel
            name="email"
            label="Email"
            type="text"
            placeholder="Enter your email address"
            onChange={onInputChange}
          />
          <InputWithLabel
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={onInputChange}
          />
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="dob" className="text-sm">
                Date of Birth :
              </label>
              <div className="flex gap-2">
                <Select
                  name="day"
                  onSelectChange={onSelectChange}
                  label="Day"
                  data={days}
                />
                <Select
                  name="month"
                  onSelectChange={onSelectChange}
                  label="Month"
                  data={months}
                />
                <Select
                  name="year"
                  onSelectChange={onSelectChange}
                  label="Year"
                  data={years}
                />
              </div>
            </div>
            <div>
              <label htmlFor="dob" className="text-sm">
                Gender
              </label>
              <br />
              <Select
                name="gender"
                onSelectChange={onSelectChange}
                label="Gender"
                data={gender}
              />
            </div>
          </div>
          <Button type="submit" className="bg-red-500">
            Create Account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const getArray = (start: number, end: number) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

export default Signup;
