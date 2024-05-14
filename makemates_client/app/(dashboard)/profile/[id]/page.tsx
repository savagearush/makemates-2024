"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Post from "@/components/Post";
import { useFollowed } from "@/hooks/isFriend";
import Posts from "@/components/Posts";

function Page() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const route = useRouter();
  const checkFollowStatus = useFollowed(Number(id));
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const response = await axios.post(
          "http://localhost:5000/search/profile",
          { id },
          { withCredentials: true }
        );
        if (response.status == 204) {
          setError("User Not Found");
        }
        if (response.status == 200) {
          setUser(response.data.userData);
          setPosts(response.data.userPost);
        }
      };
      getUserProfile();
      setIsFriend(checkFollowStatus);
    } catch (err: any) {
      if (err.response.status == 301) {
        route.push("/");
      }
    }
  }, [checkFollowStatus, id, route]);

  const handleFollow = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/follow",
        {
          friendId: id,
        },
        { withCredentials: true }
      );
      if (res.data == "DONE") {
        setIsFriend(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnFollow = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/unfollow",
        {
          friendId: id,
        },
        { withCredentials: true }
      );

      if (res.data == "DONE") {
        setIsFriend(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(posts);
  if (user) {
    return (
      <div className="flex w-[1200px] justify-between items-center relative pl-4">
        <div className="fixed top-[100px] h-[600px] w-[300px] flex flex-col gap-4 p-2 shadow-md bg-slate-50 rounded-md">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              src="/avatar.png"
              alt="user profile image"
              width="120"
              height="120"
              className="rounded-full border-2 shadow-lg w-auto"
            />
            <span className="font-semibold">{user.name}</span>
            {isFriend ? (
              <Button
                size={"sm"}
                onClick={handleUnFollow}
                className="bg-green-500"
              >
                unfollow
              </Button>
            ) : (
              <Button
                size={"sm"}
                onClick={handleFollow}
                className="bg-green-500"
              >
                Follow
              </Button>
            )}
          </div>
          <div className="px-2">
            <h6 className="font-bold text-sm">Intro</h6>
            <p className="text-sm">
              A Sophomore Guy, Doing What it takes to achieve what He
              wants....😜
            </p>
          </div>
          <div className="px-2">
            <h6 className="font-bold text-sm">Hobbies</h6>
            <div className="flex flex-wrap gap-1 font-light">
              <Badge variant={"outline"} className="cursor-pointer">
                💻Coding
              </Badge>
              <Badge variant={"outline"} className="cursor-pointer">
                🚅Traveling
              </Badge>
              <Badge variant={"outline"} className="cursor-pointer">
                🎶Music
              </Badge>
              <Badge variant={"outline"} className="cursor-pointer">
                🕹️Video Games
              </Badge>
            </div>
          </div>
        </div>
        <div className="ml-[350px] flex flex-col gap-4">
          <Posts userId={Number(id)} />
        </div>
      </div>
    );
  } else {
    return <div>No user found</div>;
  }
}

export default Page;
