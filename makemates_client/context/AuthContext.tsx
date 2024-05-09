"use client";
import { CreateNewUser, SignInUser, LogOutUser } from "@/axios.config";
import { AuthContextType, LoginInputType, SignUpInputType } from "@/typings";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem("user") || "{}")
  );

  const router = useRouter();
  const userSignUp = async (inputs: SignUpInputType) => {
    try {
      const response = await CreateNewUser(inputs);
      if (response.status === 200) {
        setCurrentUser({ id: response.id }); // Set current user state
        router.push("/feed");
      }
    } catch (error) {
      // Handle error
      console.log("Account doesn't created...", error);
    }
  };

  const userLogin = async (inputs: LoginInputType) => {
    // Correct type
    try {
      const response = await SignInUser(inputs);
      console.log(response);
      setCurrentUser({ id: response.id }); // Set current user state
      router.push("/feed");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const userLogout = async () => {
    const response = await LogOutUser();
    setCurrentUser({});
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    console.log("Current user : ", currentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userLogin, userSignUp, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
