import { API_ENDPOINT } from "@/axios.config";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBox, setSearchBox] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);

    setTimeout(async () => {
      try {
        const res = await axios.post(
          `${API_ENDPOINT}/search/user`,
          {
            keyword,
          },
          { withCredentials: true }
        );
        setData(res.data);
      } catch (err) {}
    }, 2000);
  };

  return (
    <div className="flex absolute flex-col top-[35px] items-center justify-center">
      <div className="flex gap-4 rounded-full bg-white/80 p-1 items-center justify-center">
        <FaSearch className="text-black pl-1" />
        <input
          placeholder="search here"
          className="bg-transparent outline-none text-black font-normal "
          onChange={handleChange}
        />
      </div>

      {keyword.length > 0 && (
        <div className="w-[400px] overflow-hidden overflow-y-auto max-h-[200px] text-black flex flex-col mt-6 rounded-md h-auto bg-white/90 drop-shadow-2xl">
          {data.length > 0 &&
            data.map((user: any) => {
              return (
                <Link
                  key={user.id}
                  href={`/profile/${user.id}`}
                  onClick={(e) => setKeyword("")}
                  target="_blank"
                  className="flex gap-2 items-center p-2 hover:bg-slate-100 cursor-pointer"
                >
                  {user.profileImage !== null ? (
                    <Image
                      src={user.profileImage}
                      alt="search result"
                      width="30"
                      height="40"
                      className="rounded-full shadow-lg"
                    />
                  ) : (
                    <Image
                      src="/avatar.png"
                      alt="search result"
                      width="30"
                      height="40"
                      className="rounded-full shadow-lg"
                    />
                  )}
                  <div className="flex flex-col">
                    <p className="text-sm">{user.name}</p>
                    {user.city !== null && (
                      <p className="text-[10px]">Gorakhpur</p>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Search;
