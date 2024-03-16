"use client";
import Link from "next/link";

export default function GetMap({address}) {
  return (
    <Link 
    href={`https://www.google.com/maps/search/?api=1&query=${address}`}
    className="text-blue-500 underline hover:cursor-pointer ">
      {address}
    </Link>
  );
};
