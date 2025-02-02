

import React from "react";
import CardEdges from "./CardEdges";

interface TestimonialProps {
  name: string;
  image: string;
  description: string;
  role: string;
}

function Testimony({ name, image, description, role }: TestimonialProps) {
  return (
    <div className="relative border shrink-0 border-gray-300 p-8 ">
      {/* edges */}
      <CardEdges color="bg-gray-300 blur-[1px]" isDefault />
      <img src="/assets/icons/quote.svg" alt="'" />
      <p className="text-md sm:text-lg my-4">{description}</p>

      <div className="flex gap-4 pt-6 border-t border-gray-300 items-center">
        <div className="w-20">
          <img src={image} alt={image} className="w-full h-full object-cover" />
        </div>

        <div>
          <h4 className="font-bold ">{name}</h4>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );
}

export default Testimony;
