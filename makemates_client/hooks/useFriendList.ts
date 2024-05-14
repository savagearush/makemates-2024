import axios from "axios";
import React, { useEffect, useState } from "react";

function useFriendList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_ENDPOINT}/user/friendList`,
          { withCredentials: true }
        );

        setList(data);
      } catch (err) {
        console.error(err);
      }
    };

    getList();
  }, []);

  return list;
}

export default useFriendList;
