"use client";
import React from "react";

const Footer = () => {
  return (
    <div className="flex bg-customFooter justify-center pt-10 pb-10">
        <div className="flex flex-col w-[70vw] text-black gap-[1vw]">
            <h2 className="text-5xl font-bold">GhostLink</h2>
            <div className="flex gap-[1.5vw] text-lg font-thin">
                <div className="flex flex-col">
                    <p>Creators</p>
                    <p>Sajin Saju</p>
                    <p>Nick</p>
                    <p>Aseef</p>
                    <p>Justin</p>
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