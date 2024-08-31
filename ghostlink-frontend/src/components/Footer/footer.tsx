"use client";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-center bg-customFooter pb-6 pt-6">
      <div className="flex w-[70vw] flex-col gap-[1vw] text-black">
        <div className="flex flex-row gap-2">
          <Image
            src="/ghostLogoPurple.png"
            alt="GhostLink Logo"
            width={40}
            height={40}
          />
          <h2 className="text-4xl font-bold">GhostLink</h2>
        </div>
        <div className="flex flex-col gap-1 text-base font-thin">
          <div className="flex flex-row justify-between gap-5">
            <p className="italic">Creators:</p>
            <p>Sajin Saju</p>
            <p>Nicholas Yim</p>
            <p>Aseef Durrani</p>
            <p>Justin Lee</p>
          </div>
          <div className="flex">
            <p>Version 1.0.0</p>
          </div>
        </div>
        <a
            href="https://www.flaticon.com/free-icons/user"
            title="user icons"
            className="text-sm text-gray-400 font-thin hover:underline"
        >
            User icons created by Flat Icons - Flaticon
        </a>
      </div>
    </div>
  );
};

export default Footer;
