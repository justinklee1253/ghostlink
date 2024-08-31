"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Waitlist = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({ fullName: '' , email: ''})

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get('email');
    if (emailParam) {
      setFormData(prevData => ({
        ...prevData,
        email: emailParam
      }));
    }
  }, []);

  /* 
    Objective: When the user inputs a value in the form, update the state of the value.
  */
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFormSubmitted = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address.');
    } else if (formData.fullName && formData.email) {
      const modal = document.getElementById('my_modal_3');
      if (modal) {
        (modal as HTMLDialogElement).showModal();
      }
    } else {
      // Optionally, you can handle the case where the fields are empty
      alert('Please fill out both fields.');
    }
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center rounded-lg p-14 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-white text-center">
          <h2 className="text-7xl font-medium text-gray-500">Join the waitlist for</h2>
          <h2 className="text-7xl font-medium bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">GhostLink!</h2>
        </motion.div>
        <div className="flex flex-col w-[18vw] gap-6">
          <div className="flex flex-col gap-4"> 
            <label className="input input-bordered flex items-center gap-2 bg-black border-2 border-[#484444] focus-within:border-[#484444] hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="h-4 w-4 flex-shrink-0">
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow text-white" placeholder="Full Name..." name="fullName" value={formData.fullName} onChange={handleChange}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-black border-2 border-[#484444] focus-within:border-[#484444] hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="h-4 w-4 flex-shrink-0">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow text-white" placeholder="Email Address..." name="email" value={formData.email} onChange={handleChange}/>
            </label>
          </div>
          <div>
            <button className="btn btn-primary w-full text-lg" onClick={handleFormSubmitted}>Join the waitlist</button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-2xl text-center">We have added you to the waitlist!</h3>
                <p className="py-4 text-md font-light text-center">Stay tuned for our launch date {formData.fullName}, we will be emailing to {formData.email} on any updates!</p>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;