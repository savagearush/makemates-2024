"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import Signup from "./_component/signup";
import InputWithLabel from "./_component/InputWithLabel";
import { Button } from "@/components/ui/button";
import { AuthContextType } from "@/typings";
import { AuthContext } from "@/context/AuthContext";
import Head from "next/head";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { userLogin }: any = useContext<AuthContextType | null>(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLogin(inputs);
    // showing alert to user
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <Head>
        <title>Makemates - Login</title>
      </Head>
      <Image
        src="/logo-light.png"
        width="240"
        height="30"
        className="absolute top-5 left-5"
        alt="logo"
      />
      <div className="flex flex-col items-center h-screen justify-center bg-white/80 gap-4 px-20 py-12 shadow-lg rounded-lg">
        <h3 className="text-xl">Join us now</h3>
        <form
          onSubmit={handleSubmit}
          name="loginForm"
          className="flex flex-col gap-4 w-[300px]"
        >
          <InputWithLabel
            name="email"
            label="Email"
            placeholder="Enter your email address"
            type="text"
            onChange={onInputChange}
          />
          <InputWithLabel
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={onInputChange}
          />
          <Button type="submit" className="bg-green-500">
            Login
          </Button>
        </form>
        <p>
          {`Don't have account? `}
          <Signup />
        </p>
      </div>
    </div>
  );
}

export default Login;
