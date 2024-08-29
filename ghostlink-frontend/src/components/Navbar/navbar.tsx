"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="navbar fixed left-1/2 top-8 flex w-[60vw] -translate-x-1/2 transform items-center justify-center rounded-full bg-customNavbar p-3 backdrop-blur-md">
      <div className="navbar-center">
        <a
          className="btn btn-ghost text-xl font-medium text-white"
          onClick={handleHome}
        >
          <Image
            src="/ghostLogoPurple.png"
            alt="GhostLink Logo"
            width={35}
            height={35}
          />
          GhostLink
        </a>
      </div>
      <div className="navbar-start"></div>
      <div className="navbar-end">
        <button className="btn btn-circle btn-ghost text-black">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge indicator-item badge-primary badge-xs"></span>
          </div>
        </button>
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a href="/">Get Started</a>
            </li>
            <li>
              <a href="/uploadFile">Make a Linkedin Post</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
