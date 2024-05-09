import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

// Check user if User Follow to Other user
export function useFollowed(friendId: number) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser }: any = useContext(AuthContext);

  useEffect(() => {
    const getResult = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/search/checkFollowed",
          { friendId },
          { withCredentials: true }
        );
        if (res.data == "USER_FOUND") {
          setIsFollowed(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getResult();
    return;
  }, []);

  return isFollowed;
}

