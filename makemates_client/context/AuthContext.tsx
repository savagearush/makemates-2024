"use client";

import { createContext, useEffect, useState } from "react";
import { CreateNewUser, SignInUser, LogOutUser } from "@/axios.config";
import { AuthContextType, LoginInputType, SignUpInputType } from "@/typings";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const userSignUp = async (inputs: SignUpInputType) => {
    try {
      const response = await CreateNewUser(inputs);
      console.log("SignUp Wala : ", response);
      router.push("/feed");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const userLogin = async (inputs: LoginInputType) => {
    try {
      const response = await SignInUser(inputs);
      router.push("/feed");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const userLogout = async () => {
    const response = await LogOutUser();
    window.localStorage.removeItem("currentUser");
    router.push("/");
  };

  // this will check on page reload if user is saved in LS
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("currentUser");
    if (loggedUser) {
      setCurrentUser(JSON.parse(loggedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userLogin, userSignUp, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
