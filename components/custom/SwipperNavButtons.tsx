"use client";

import React from "react";
import { useSwiper } from "swiper/react";

function SwipperNavButtons() {
  const swipper = useSwiper();
  return (
    <div className="flex gap-4">
      <button
        onClick={() => swipper.slidePrev()}
        className="size-14 flex justify-center items-center border-gray-500  bg-white border rounded-full"
      >
        <img src="/assets/icons/arrow.svg" alt="<" />
      </button>
      <button
        onClick={() => swipper.slideNext()}
        className="size-14 flex justify-center items-center border-gray-500  rotate-180 bg-white border rounded-full"
      >
        <img src="/assets/icons/arrow.svg" alt=">" />
      </button>
    </div>
  );
}

export default SwipperNavButtons;
