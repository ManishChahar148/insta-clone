import React, { useState } from "react";
const { v4 } = require("uuid");

export interface Reel {
  id: number;
  fileName: string;
  liked: boolean;
  comments: Array<Comment>;
}

export interface Comment {
  id: string;
  text: string;
  userName: string;
  profilePic: string;
  liked: boolean;
  replies?: Array<string>;
}

const reelsData = [
  {
    id: v4(),
    fileName: "v1.mp4",
    liked: true,
    comments: [
      {
        id: v4(),
        text: "good",
        userName: "_manishchahar149",
        profilePic: "/images/profile.jpg",
        liked: false,
        replies: ["xyz", "pqr"],
      },
      {
        id: v4(),
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
  {
    id: v4(),
    fileName: "v2.mp4",
    liked: false,
    comments: [
      {
        id: v4(),
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: v4(),
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
  {
    id: v4(),
    fileName: "v3.mp4",
    liked: false,
    comments: [
      {
        id: v4(),
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: v4(),
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
  {
    id: v4(),
    fileName: "v4.mov",
    liked: true,
    comments: [
      {
        id: v4(),
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: v4(),
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
];

const nestedValueUpdater = (
  arr: any,
  fieldToCompare: string,
  valueToCompare: any,
  fieldToOperateOn: any,
  operation: any
) => {
  const updatedData = arr.map((ele: any) => {
    if (ele[fieldToCompare] !== valueToCompare) return ele;
    return {
      ...ele,
      [fieldToOperateOn]: operation(ele[fieldToOperateOn]),
    };
  });
  return updatedData;
};

const useVideoActions = (): [
  data: Array<Reel>,
  toggleLike: (id: number) => void,
  toggleCommentLike: (reelId: number, commentId: number) => void,
  addComment: (reelId: number, cmt: any) => void,
  deleteComment: (reelId: number, cmtId: number) => void,
  editComment: (reelId: number, cmtId: number, text: string) => void,
  replyToComment: (reelId: number, cmtId: number, text: string) => void
] => {
  const [data, setData] = useState<Array<Reel>>(reelsData);

  const toggleLike = (id: number) => {
    const updatedData = nestedValueUpdater(
      data,
      "id",
      id,
      "liked",
      (value: any) => !value
    );

    setData(updatedData);
  };

  const toggleCommentLike = (reelId: number, commentId: number) => {
    console.log(commentId, "commentId");
    const updatedData = data.map((reel) => {
      if (reel.id !== reelId) return reel;
      const comments = reel.comments;
      const updatedComments = nestedValueUpdater(
        comments,
        "id",
        commentId,
        "liked",
        (value: any) => !value
      );

      return {
        ...reel,
        comments: updatedComments,
      };
    });
    setData(updatedData);
  };

  const addComment = (reelId: number, cmt: Comment) => {
    const updatedData = nestedValueUpdater(
      data,
      "id",
      reelId,
      "comments",
      (value: any) => [cmt, ...value]
    );
    setData(updatedData);
  };

  const deleteComment = (reelId: number, cmtId: number) => {
    const updatedData = nestedValueUpdater(
      data,
      "id",
      reelId,
      "comments",
      (cmts: any) => cmts.filter((cmt: Comment) => cmt.id !== cmtId)
    );
    setData(updatedData);
  };

  const editComment = (reelId: number, cmtId: number, text: string) => {
    const updatedData = nestedValueUpdater(
      data,
      "id",
      reelId,
      "comments",
      (cmts: any) => nestedValueUpdater(cmts, "id", cmtId, "text", () => text)
    );
    setData(updatedData);
  };

  const replyToComment = (reelId: number, cmtId: number, text: string) => {
    const updatedData = nestedValueUpdater(
      data,
      "id",
      reelId,
      "comments",
      (cmts: any) =>
        nestedValueUpdater(
          cmts,
          "id",
          cmtId,
          "replies",
          (replies: Array<string>) =>
            Array.isArray(replies) ? [...replies, text] : [text]
        )
    );
    setData(updatedData);
  };

  return [
    data,
    toggleLike,
    toggleCommentLike,
    addComment,
    deleteComment,
    editComment,
    replyToComment,
  ];
};

export default useVideoActions;
