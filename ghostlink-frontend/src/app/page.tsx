"use client";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

import DashboardImg from "./Assets/Images/DashboardImg.jpg"

export default function Home() {
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  })

  const router = useRouter();

  const handleFileUpload = () => {
    router.push("/uploadFile");
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div variants={{ hidden: { opacity: 0, y: -75 }, visible: { opacity:1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center min-h-[85vh] w-[40vw]">
        <h1 className="text-center text-5xl font-bold mb-8 text-white font-medium">
          Welcome to GhostLink
        </h1>
        <p className="mb-8 text-center text-lg font-extralight text-white">
          An all-in-one platform that makes video transcription simple and helps
          you create impactful LinkedIn posts that drive high engagement.
        </p>
        <div className="flex w-full justify-center gap-[1vw]">
          <button className="btn btn-primary" onClick={handleFileUpload}>
            Get Started
          </button>
          <button className="ghost btn border-0 text-white">Learn More</button>
        </div>
      </motion.div>
      <div>
        <Image src={DashboardImg} alt="Dashboard Display" className="w-[65vw] p-4 pb-0 border-[20px] border-b-0 border-[rgba(238,238,238,0.1)] rounded-tl-[4vw] rounded-tr-[4vw] shadow-[0px_0px_5px_rgba(0,0,0,0.1)]"/>
      </div>
      <motion.div ref={ref1} initial={{ opacity: 0 }} animate={{ opacity: inView1 ? 1 : 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center w-full min-h-[55vh] bg-[#f5f5f7] ">
        <div className="flex flex-col w-[70vw]">
          <h4 className="w-[47vw] text-5xl mb-3 font-light">Optimize your LinkedIn post with our intuitive tools</h4>
          <p className="w-[47vw] text-lg font-extralight">Designed to enhance your content&apos;s reach and effectiveness. From automated video transcription to engaging content with audience retention, we provide everything you need to captivate your audience and boost your online presence.</p>
        </div>
      </motion.div>
      <motion.div ref={ref2} initial={{ opacity: 0 }} animate={{ opacity: inView2 ? 1 : 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center w-full min-h-[60vh] text-white">
        <h4 className="w-[37vw] text-center text-5xl font-light mb-8">Ditch the ghostwriters and elevate your engagement.</h4>
        <div className="flex gap-[1vw]">
          <button className="btn btn-primary" onClick={handleFileUpload}>
            Sign Up
          </button>
          <button className="btn ghost text-white border-0">
            Not Sure?
          </button>
        </div>
      </motion.div>
    </div>
  );
}
