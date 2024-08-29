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
        <div className="flex gap-[1.5vw] text-base font-thin">
          <div className="flex flex-col">
            <p>Creators</p>
            <p>Sajin Saju</p>
            <p>Nicholas Yim</p>
            <p>Aseef Durrani</p>
            <p>Justin Lee</p>
          </div>
          <div className="flex flex-col">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
