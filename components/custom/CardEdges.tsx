import React from "react";

function CardEdges({
  color,
  isDefault,
}: {
  color: string;
  isDefault?: boolean;
}) {
  return (
    <>
      {/*Left top Edge  */}
      <div className="absolute  left-0 top-0">
        <div className={`w-3 h-[2px] ${color}`}></div>
        <div className={`w-[2px] h-3 ${color}`}></div>
      </div>
      {/*Right top Edge  */}
      <div
        className={`${
          isDefault ? "top-0" : "-top-4"
        } absolute  right-0  rotate-180`}
      >
        <div className={`w-[2px] h-3 ${color}`}></div>
        <div className={`w-3 h-[2px] ${color}`}></div>
      </div>
      {/*Right Bottom Edge  */}
      <div className=" absolute right-0 bottom-0 rotate-180">
        <div className={`w-3 h-[2px] ${color}`}></div>
        <div className={`w-[2px] h-3 ${color}`}></div>
      </div>
      {/*Left Bottom Edge  */}
      <div className=" absolute left-0 bottom-0 ">
        <div className={`w-[2px] h-3 ${color}`}></div>
        <div className={`w-3 h-[2px] ${color}`}></div>
      </div>
    </>
  );
}

export default CardEdges;
