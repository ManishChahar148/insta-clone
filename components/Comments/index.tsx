import { Comment } from "@/hooks/useVideoActions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  comments: Array<Comment>;
  setCommentsVisible: (v: boolean) => void;
  reelId: number;
  toggleCommentLike: (reelId: number, commentId: number) => void;
  addComment: (reelId: number, cmt: Comment) => void;
}

const Comments = (props: Props) => {
  const [cmtv, setCmtv] = useState("");

  const {
    comments,
    setCommentsVisible,
    reelId,
    toggleCommentLike,
    addComment,
  } = props;

  useEffect(() => {
    const scrollArea = document.getElementById("scrollArea");
    if (!scrollArea) return;
    scrollArea.style.overflow = "hidden";

    return () => {
      scrollArea.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="absolute py-4 flex flex-col bg-[#262626] rounded-md  -translate-x-full sm:-translate-y-full -bottom-2 sm:top-12 left-8 sm:-right-6 w-screen sm:w-72 h-96  ">
      <div className="flex relative px-6 pb-6 ">
        <div className="w-8 absolute left-6">
          <button onClick={() => setCommentsVisible(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="w-full text-center text-lg font-medium">Comments</div>
      </div>

      <ul className="overflow-scroll h-full px-6">
        {comments.map((cmt, idx) => {
          return (
            <li key={idx} className="mt-2 flex">
              <div className="pt-1">
                <Image
                  className="rounded-full mr-2"
                  alt="Profile"
                  width={24}
                  height={24}
                  src="/images/profile.jpeg"
                />
              </div>
              <div className="pl-2 w-full">
                <p className="text-base">{cmt.userName}</p>
                <p className="text-sm font-light mt-1">{cmt.text}</p>
                <div className="mt-2 flex">
                  <p className="text-xs text-[#a8a8a8] font-semibold">
                    200 likes
                  </p>
                  <p className="ml-2 text-xs text-[#a8a8a8] font-semibold">
                    Reply
                  </p>
                </div>
              </div>
              <div className="pl-2 ">
                <button onClick={() => toggleCommentLike(reelId, cmt.id)}>
                  <span
                    className={`scale-75 material-symbols-outlined ${
                      cmt.liked && "fill-icon text-red-600"
                    }`}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="px-6 py-2  w-full">
        <div className="flex px-2 border-[1px] rounded-full py-2 bg-black border-white">
          <div className="flex-none">
            {" "}
            <Image
              className="rounded-full mr-2"
              alt="Profile"
              width={24}
              height={24}
              src="/images/profile.jpeg"
            />
          </div>
          <div className="w-full sm:w-[150px]">
            <input
              value={cmtv}
              onChange={(e) => setCmtv(e.target.value)}
              className="bg-black text-white border-none outline-none"
              type="text"
              placeholder="add a comment"
            />
          </div>
          <div className="text-blue-600">
            <button
              onClick={() => {
                addComment(reelId, {
                  id: comments.length,
                  text: cmtv,
                  liked: false,
                  userName: "_manishchahar148",
                  profilePic: "/images/profile.jpg",
                });
                setCmtv("");
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
