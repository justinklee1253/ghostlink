"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="flex bg-customFooter justify-center pt-6 pb-6">
        <div className="flex flex-col w-[70vw] text-black gap-[1vw]">
            <h2 className="text-4xl font-bold">GhostLink</h2>
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