"use client";

import { useRef } from "react";

/**
 * Homepage portrait with an Easter egg: hovering swaps the photo for a
 * looping video in the same frame. Video only plays while hovered.
 */
export default function Headshot() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    videoRef.current?.play().catch(() => {});
  };
  const pause = () => {
    videoRef.current?.pause();
  };

  return (
    <div
      className="intro-media-frame headshot-hover"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/headshot.jpg" alt="Lucas Terry" />
      <video
        ref={videoRef}
        src="/headshot-hover.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
