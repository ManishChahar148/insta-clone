import Image from "next/image";
import React from "react";
import Comments from "../Comments";
import { Comment } from "@/hooks/useVideoActions";

interface Props {
  liked: boolean;
  toggleLike: (id: string) => void;
  reelId: string;
  comments: any;
  commentsVisible: boolean;
  setCommentsVisible: (v: any) => void;
  toggleCommentLike: (reelId: string, commentId: string) => void;
  addComment: (reelId: string, cmt: Comment) => void;
  deleteComment: (reelId: string, cmtId: string) => void;
  editComment: (reelId: string, cmtId: string, text: string) => void;
  replyToComment: (reelId: string, cmtId: string, text: string) => void;
}

const ReelActions = (props: Props) => {
  const {
    liked,
    reelId,
    toggleLike,
    comments,
    commentsVisible,
    setCommentsVisible,
    toggleCommentLike,
    addComment,
    deleteComment,
    editComment,
    replyToComment,
  } = props;
  return (
    <div className="bottom-16 sm:bottom-6 right-2 sm:-right-[36px] absolute ">
      <ul>
        <li className="py-2">
          <button onClick={() => toggleLike(reelId)}>
            <span
              className={`material-symbols-outlined ${
                liked && "fill-icon text-red-600"
              }`}
            >
              favorite
            </span>
          </button>
        </li>
        <li className="py-2">
          <button onClick={() => setCommentsVisible((prev: any) => !prev)}>
            <span className="material-symbols-outlined">comment</span>
          </button>
        </li>
        <li className="py-2 -rotate-45">
          <button
            onClick={() => {
              navigator?.share?.({
                url: location.href,
              });
            }}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </li>
        <li className="py-2">
          <button>
            <span className="material-symbols-outlined">bookmark</span>
          </button>
        </li>
        <li className="py-2">
          <button>
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </li>
        <li className="py-2">
          <button>
            <Image
              className="rounded-md border-2"
              alt="Profile"
              width={24}
              height={24}
              src="/images/profile.jpeg"
            />
          </button>
        </li>
      </ul>
      {commentsVisible && (
        <Comments
          reelId={reelId}
          setCommentsVisible={setCommentsVisible}
          comments={comments}
          toggleCommentLike={toggleCommentLike}
          addComment={addComment}
          deleteComment={deleteComment}
          editComment={editComment}
          replyToComment={replyToComment}
        />
      )}
    </div>
  );
};

export default ReelActions;
