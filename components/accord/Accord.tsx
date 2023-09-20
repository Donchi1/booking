import React from "react";
import Link from "next/link";

function Accord({ title }: { title: string }) {
  return (
    <div
      className="flex
    justify-between
    items-center
    w-full
    max-w-[1240px]
    mx-auto mt-[1rem] mb-0"
    >
      <h2>{title}</h2>
      <div
        className="flex
    justify-center;
    items-center;
    gap-[10px]"
      >
        <Link
          className="
    border-1px border-[#0071c2]
    font-bold
    py-[6px] px-[5px]
    cursor-pointer
    rounded-[5px]"
          href="/"
        >
          Home
        </Link>

        <button
          className=" bg-[#0071c2]
    text-white
    font-bold
    px-[5px] py-[10px]
    border-none
    cursor-pointer
     rounded-[5px]"
        >
          {title}
        </button>
      </div>
    </div>
  );
}

export default Accord;
