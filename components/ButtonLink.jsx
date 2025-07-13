import Link from "next/link";
import React from "react";
import Button from "./Button";

const ButtonLink = ({ href = "/" }) => {
  return (
    <Link href={href}>
      <Button
        className={
          "rounded-full bg-white w-[120px] text-black  flex gap-1 items-center justify-center absolute z-99 mt-3 ml-3 px-8 py-1 "
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 absolute left-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Kembali
      </Button>
    </Link>
  );
};

export default ButtonLink;
