import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import moment from "moment";

function Post({
  caption,
  name,
  mediaUrl,
  postDate,
  profileImage,
}: {
  caption: string;
  mediaUrl: string;
  postDate: string;
  name: string;
  profileImage: string | null;
}) {
  return (
    <div className="flex flex-col w-full rounded-md shadow-lg bg-slate-50">
      <div className="w-full p-2 ">
        <div className="flex gap-2 w-full">
          {profileImage !== null ? (
            <Image
              src={profileImage}
              className="rounded-full shadow-lg "
              width="40"
              height="40"
              alt="Profile pic"
            />
          ) : (
            <Image
              src="/avatar.png"
              className="rounded-full shadow-lg"
              width="40"
              height="40"
              alt="Profile pic"
            />
          )}
          <div className="flex flex-col">
            <h6 className="text-[14px]">{name}</h6>
            <span className="text-[10px] text-muted-foreground">
              {moment(postDate).fromNow()}
            </span>
          </div>
        </div>
        <div className="text-sm p-2">{caption}</div>
      </div>
      <div className="relative">
        <Image
          className="w-auto"
          src={mediaUrl}
          width={400}
          height={400}
          alt="user post"
        />
      </div>
      <div className="flex p-2 gap-2">
        <Button variant={"ghost"}>12 Likes</Button>
        <Button variant={"ghost"}>5 Comments</Button>
        <Button variant={"ghost"}>3 Shares</Button>
      </div>
    </div>
  );
}

export default Post;
