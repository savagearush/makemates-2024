"use client";

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Posts from "@/components/Posts";

import { AiFillLike } from "react-icons/ai";
import { BsMessenger } from "react-icons/bs";
import { FaBookmark, FaUserFriends } from "react-icons/fa";
import { TbHttpPost } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import FeedUploadBox from "./_components/FeedUploadBox";
import { AuthContext } from "@/context/AuthContext";
import useFriendList from "@/hooks/useFriendList";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import axios from "axios";
import { API_ENDPOINT } from "@/axios.config";

const leftSidebarNavigations = [
  {
    name: "Mate",
    href: "/mates",
    icon: <FaUserFriends className="text-[#003789]" />,
  },
  {
    name: "Messengers",
    href: "/messenger",
    icon: <BsMessenger className="text-[#003789]" />,
  },
  {
    name: "Liked",
    href: "/liked",
    icon: <AiFillLike className="text-[#003789]" />,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: <TbHttpPost className="text-[#003789]" />,
  },
  {
    name: "Saved",
    href: "/saved",
    icon: <FaBookmark className="text-[#003789]" />,
  },
];

function Page() {
  const friendsList = useFriendList();

  const { currentUser, setCurrentUser }: any = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(`${API_ENDPOINT}/user/me`, {
        withCredentials: true,
      });
      window.localStorage.setItem("currentUser", JSON.stringify(data));
      setCurrentUser((prev: any) => ({
        ...prev,
        id: data.id,
        name: data.name,
        img: data.image_url,
      }));
    };

    getUserData();
  }, [setCurrentUser]);

  return currentUser ? (
    <>
      <div className="fixed top-[100px] w-[300px] flex flex-col gap-4">
        <div className="flex p-2 rounded-md shadow-lg bg-slate-50 items-center justify-start gap-5">
          {currentUser.img !== null ? (
            <Image
              src={currentUser.img}
              className="rounded-full shadow-md"
              width="40"
              height="40"
              alt="Profile pic"
            />
          ) : (
            <Image
              src="/avatar.png"
              className="rounded-full"
              width="40"
              height="40"
              alt="Profile pic"
            />
          )}

          <div className="flex flex-col">
            <div className="font-semibold text-sm">{currentUser.name}</div>
            {/* <div className="text-xs text-muted-foreground">GhostRider</div> */}
          </div>
        </div>

        <div className="flex p-2 bg-slate-50 rounded-md shadow-lg tems-center justify-start gap-5">
          <ul className="flex flex-col gap-3 w-full">
            {leftSidebarNavigations.map(({ name, icon, href }) => {
              return (
                <li
                  key={name}
                  className="w-full p-1 hover:bg-purple-100 rounded-md"
                >
                  <Link
                    href={href}
                    className="flex gap-3 items-center justify-start font-medium"
                  >
                    {icon} {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex gap-4 flex-col w-[500px] ml-[330px]">
        <Posts userId={currentUser.id} />
      </div>

      <div className="w-[300px] fixed top-[100px] ml-[870px]  rounded-md h-[500px] overflow-y-auto">
        <div>
          <h4 className="font-semibold text-sky-900">Followers :</h4>
          <div className="flex bg-slate-50 gap-2 shadow-md rounded-md flex-col mt-2 w-full ">
            {friendsList.length > 0 ? (
              friendsList.map((friend: any) => {
                return (
                  <HoverCard key={`${friend.follow_id}-${friend.follower_id}`}>
                    <HoverCardTrigger className="flex items-center rounded-md">
                      <div className="flex justify-between items-center p-2 w-full rounded-mdcursor-pointer">
                        <div className="flex gap-2 items-center">
                          {friend.profileImage !== null ? (
                            <Image
                              src={friend.profileImage}
                              width={"30"}
                              height={"30"}
                              alt="friendImages"
                              className="rounded-full shadow-md"
                            />
                          ) : (
                            <Image
                              src="/avatar.png"
                              width={"30"}
                              height={"30"}
                              alt="friendImages"
                              className="rounded-full shadow-md"
                            />
                          )}
                          <span>{friend.name}</span>
                        </div>
                        <div className="mr-2 flex items-ceter">
                          <Link
                            href={`/profile/${friend.follow_id}`}
                            target="_black"
                            className="bg-slate-100 rounded-full p-2"
                          >
                            <FaUser className="text-sky-700 w-4 h-4 " />
                          </Link>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-col text-sm mr-[400px] w-[200px]">
                      <div className="flex items-center gap-2">
                        {friend.profileImage !== null ? (
                          <Image
                            src={friend.profileImage}
                            width={"30"}
                            height={"30"}
                            alt="friendImages"
                            className="rounded-full shadow-md"
                          />
                        ) : (
                          <Image
                            src="/avatar.png"
                            width={"30"}
                            height={"30"}
                            alt="friendImages"
                            className="rounded-full shadow-md"
                          />
                        )}

                        <span className="font-bold">{friend.name}</span>
                      </div>
                      <div className="text-xs ">Last seen 12 min ago</div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })
            ) : (
              <>
                <div>No Followers</div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    "Loading"
  );
}

export default Page;
