import React, { useState } from "react";

export interface Reel {
  id: number;
  fileName: string;
  liked: boolean;
  comments: Array<Comment>;
}

export interface Comment {
  id: number;
  text: string;
  userName: string;
  profilePic: string;
  liked: boolean;
}

const reelsData = [
  {
    id: 1,
    fileName: "v1.mp4",
    liked: true,
    comments: [
      {
        id: 1,
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: 2,
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
      {
        id: 3,
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
      {
        id: 4,
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
      {
        id: 5,
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
  {
    id: 2,
    fileName: "v2.mp4",
    liked: false,
    comments: [
      {
        id: 1,
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: 2,
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
  {
    id: 3,
    fileName: "v3.mp4",
    liked: false,
    comments: [
      {
        id: 1,
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: 2,
        text: "Amazing",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: true,
      },
    ],
  },
  {
    id: 4,
    fileName: "v4.mov",
    liked: true,
    comments: [
      {
        id: 1,
        text: "good",
        userName: "_manishchahar148",
        profilePic: "/images/profile.jpg",
        liked: false,
      },
      {
        id: 2,
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
  addComment: (reelId: number, cmt: any) => void
] => {
  const [data, setData] = useState<Array<Reel>>(reelsData);

  const toggleLike = (id: number) => {
    // const updatedData = data.map((reel) => {
    //   if (reel.id !== id) return reel;
    //   return {
    //     ...reel,
    //     liked: !reel.liked,
    //   };
    // });

    const updatedData = nestedValueUpdater(
      data,
      "id",
      id,
      "text",
      (value: any) => !value
    );

    setData(updatedData);
  };

  const toggleCommentLike = (reelId: number, commentId: number) => {
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
      (value: any) => [...value, cmt]
    );
    setData(updatedData);
  };

  return [data, toggleLike, toggleCommentLike, addComment];
};

export default useVideoActions;
