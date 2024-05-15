import { API_ENDPOINT } from "@/axios.config";
import { AuthContext } from "@/context/AuthContext";
import { NewComment } from "@/typings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SendIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export function Comments({ postId }: { postId: any }) {
  const { currentUser }: any = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const queryclient = useQueryClient();

  const mutation = useMutation<NewComment, Error, NewComment>({
    mutationFn: (newComment) => {
      return axios.post(`${API_ENDPOINT}/posts/comments/add`, newComment, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["newComment"] });
    },
  });

  const handleComment = () => {
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  const {
    isPending,
    isError,
    data: allComments,
    error,
  }: any = useQuery({
    queryKey: ["newComment"],
    queryFn: fetchPostComments,
  });

  async function fetchPostComments() {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/posts/comments/${postId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        {allComments &&
          allComments.map((cmnt: any) => {
            return (
              <p key={cmnt.id}>
                {cmnt.name} - {cmnt.desc}
              </p>
            );
          })}
      </div>
      <div className="flex justify-start items-center">
        <Image
          src="/avatar.png"
          className="rounded-full shadow-lg p-1 m-1"
          width="30"
          height="30"
          alt="Profile pic"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.currentTarget.value)}
          placeholder={`${currentUser.name.split(" ")[0]}'s Comment here`}
          className="w-[100%] bg-slate-200 rounded-3xl focus:outline-none focus-within:none p-1 text-xs px-2"
          name="postComment"
        />
        <button
          onClick={handleComment}
          className="p-2 mx-1 my-1 rounded-full bg-blue-800"
        >
          <SendIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    </>
  );
}
