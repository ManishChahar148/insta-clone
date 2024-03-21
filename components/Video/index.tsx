import React from "react";

interface Props {
  idx: number;
  handleOnVideoClick: (key: number) => void;
  muted: boolean;
  src: string;
  poster: string;
}

const Video = (props: Props) => {
  const { idx, handleOnVideoClick, muted, src, poster } = props;
  return (
    <video
      poster={poster}
      id={`video-${idx}`}
      onClick={() => handleOnVideoClick(idx)}
      className="w-full h-full sm:h-[95%] object-cover"
      playsInline
      autoPlay={idx === 0}
      muted={muted}
      loop
      preload="none"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
