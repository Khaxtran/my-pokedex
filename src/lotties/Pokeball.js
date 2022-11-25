import React from 'react'
import Lottie from "react-lottie";
import animationData from "./pokeball-loading-animation.json";

export default function Pokeball({lottieWidth, lottieHeight}) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

  return (
    <div id="lottie">
      <Lottie
        options={defaultOptions}
        isClickToPauseDisabled={true}
        width = {lottieWidth} height = {lottieHeight}
      />
    </div>
  )
}
