"use client";

import ReelActions from "@/components/ReelActions";
import Video from "@/components/Video";
import useVideoActions, { Reel } from "@/hooks/useVideoActions";
import React, { useEffect, useState } from "react";

const Reels = () => {
  const [muted, setMuted] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string>("video-0");
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [
    reelsData,
    toggleLike,
    toggleCommentLike,
    addComment,
    deleteComment,
    editComment,
    replyToComment,
  ] = useVideoActions();

  const observerCallback = (entries: any, observer: any) => {
    // entries.forEach((e) => console.log(e, "====", entries.length));
    const entry = entries[0];
    if (entry.isIntersecting) {
      const inViewVid = entry?.target?.children[0]?.id;
      console.log(inViewVid, ">>>>>");
      if (playingVideoId !== inViewVid) {
        const currentPlaying = document.getElementById(
          playingVideoId
        ) as HTMLVideoElement;
        console.log("pausing", playingVideoId);
        currentPlaying?.pause();
      }

      const InViewVideoEle = document.getElementById(
        inViewVid
      ) as HTMLVideoElement;
      console.log("InViewVideoEle", InViewVideoEle.paused);
      if (InViewVideoEle.paused) {
        console.log("playing", inViewVid);
        InViewVideoEle?.play();
        setPlayingVideoId(inViewVid);
      }
    }
  };

  useEffect(() => {
    let options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(observerCallback, options);

    const targets =
      document.querySelector("#scrollArea")?.children || ([] as any);

    [...targets].forEach((t) => observer.observe(t));
  }, [playingVideoId]);

  const handleOnVideoClick = (key: number) => {
    const vid = `video-${key}`;
    const vEle = document.getElementById(vid) as HTMLVideoElement;

    if (playingVideoId !== vid) {
      const currentPlaying = document.getElementById(
        playingVideoId
      ) as HTMLVideoElement;
      currentPlaying?.pause();
    }

    if (!vEle.paused) {
      vEle?.pause();
    } else {
      vEle?.play();
      setPlayingVideoId(vid);
    }
  };

  return (
    <div
      id="scrollArea"
      className="hide-scrollbar overflow-y-scroll h-full flex flex-col items-center snap-y snap-mandatory"
      dir="ltr"
    >
      {reelsData?.map((reelData: Reel, key) => {
        return (
          <div
            key={key}
            className="snap-start w-full sm:w-96 h-full min-h-full relative flex items-center"
          >
            <Video
              handleOnVideoClick={handleOnVideoClick}
              idx={key}
              muted={muted}
              src={`/videos/${reelData.fileName}`}
            />

            <button
              onClick={() => setMuted((prev) => !prev)}
              className="absolute right-4 top-4 sm:top-6 bg-opacity-50	 bg-black px-2 py-2 flex justify-center items-center rounded-full "
            >
              <span className="material-symbols-outlined">
                {muted ? "volume_off" : "volume_up"}
              </span>
            </button>

            <ReelActions
              reelId={reelData.id}
              toggleLike={toggleLike}
              liked={reelData.liked}
              comments={reelData.comments}
              commentsVisible={commentsVisible}
              setCommentsVisible={setCommentsVisible}
              toggleCommentLike={toggleCommentLike}
              addComment={addComment}
              deleteComment={deleteComment}
              editComment={editComment}
              replyToComment={replyToComment}
            ></ReelActions>
          </div>
        );
      })}
    </div>
  );
};

export default Reels;
