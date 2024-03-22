"use client";
import Link from "next/link";
import { openLinkInNewWindow } from "../lib/utils/openLink";

export default function GetMap({address}) {
  let url = `https://www.google.com/maps/search/?api=1&query=${address}`;

  let handleClick = (e) => {
    e.preventDefault();
    openLinkInNewWindow(url)
  }

  return (
    <Link 
    onClick={handleClick}
    className="text-blue-500 underline hover:cursor-pointer hover:text-blue-300 "
    href=""
    >
      {address}
    </Link>
  );
};
