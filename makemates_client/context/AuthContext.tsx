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
    toast.promise(CreateNewUser(inputs), {
      loading: "Creating New Account....",
      success: res => {
          // Redirect to the feed page upon successful Registration
          router.push("/feed");
          return `Successful`;
      },
      error: res => {
          // Display the error message from the response data
          return `${res.response.data}`;
      },
  });
  };

  const userLogin = async (inputs: LoginInputType) => {
    toast.promise(SignInUser(inputs), {
      loading: "Logging....",
      success: res => {
          // Redirect to the feed page upon successful login
          router.push("/feed");
          return `Login Successful`;
      },
      error: res => {
          // Display the error message from the response data
          return `${res.response.data}`;
      },
  });
  };

  const userLogout = async () => {
    const response = await LogOutUser();
    window.localStorage.removeItem("currentUser");
    router.push("/");
  };

  // this will check on page reload if user is saved in LS
  // Check on page reload if user is saved in local storage
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("currentUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setCurrentUser(user);
    }
  }, []);

  // // Use this effect to track changes in currentUser
  // useEffect(() => {
  //   console.log(currentUser); // This will show the updated value
  // }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userLogin, userSignUp, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
