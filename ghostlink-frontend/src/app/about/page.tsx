"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import product from "@/assets/Images/product.png";
import waitlist from "@/assets/Images/waitlist.png";
import themeeno2 from "@/assets/Images/themeeno2.png";
import cool from "@/assets/Images/cool.png";
import VideoInput from "@/assets/Images/VideoInput.png";

export default function About() {
    const [email, setEmail] = useState('')

    const router = useRouter();

    const { ref: ref1, inView: inView1 } = useInView({
        triggerOnce: true,
        threshold: 0.6,
    });
    const { ref: ref2, inView: inView2 } = useInView({
        triggerOnce: true,
        threshold: 0.6,
    });
    const { ref: ref3, inView: inView3 } = useInView({
        triggerOnce: true,
        threshold: 0.6,
    });

    const { ref: ref4, inView: inView4 } = useInView({
        triggerOnce: true,
        threshold: 0.6,
    });
    
    const { ref: ref5, inView: inView5 } = useInView({
        triggerOnce: true,
        threshold: 0.6,
    });

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target
        setEmail(value)
    }

    const handleWaitlist = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
        if(emailPattern.test(email)) {
          router.push(`/waitlist?email=${encodeURIComponent(email)}`);
        } else if(email === '') {
          router.push(`/waitlist`);
        } else {
          alert("Please enter a valid email address.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center text-white">
            <motion.div 
                variants={{
                    hidden: { opacity: 0, y: -75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
                className="flex min-h-screen w-[45vw] flex-col items-center justify-center text-center"
            >
                <h1 className="mb-8 text-center text-5xl sm:text-5xl font-bold font-medium text-white">Centralized hub to streamline your content creation</h1>
                <div className="flex bg-[#f5f5f7] gap-2 md:gap-[1vw] pt-1 pb-1 pl-4 pr-1 rounded-md w-full max-w-[400px]">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-transparent text-black focus:outline-none text-base md:text-lg w-full" 
                        value={email} 
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" onClick={handleWaitlist}>
                        Join Waitlist
                    </button>
                </div>
            </motion.div>
            <div className="flex w-full flex-col pl-[15vw] pr-[15vw] pt-40 pb-40 bg-[#f5f5f7] text-black">
                <motion.div
                    ref={ref1}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView1 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="w-[55vw] md:text-5xl font-light mb-20"></h2>
                </motion.div>
                <div className="flex flex-col w-[65vw] gap-[5vw]">
                <motion.div 
                        ref={ref2}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: inView2 ? 1 : 0, x: inView2 ? 0 : -100 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-center"
                    >
                        <div className="bg-[rgba(179,214,243,1.0)] rounded-xl pl-[2vw] pr-[2vw] pt-10 pb-10" >
                            <Image className="w-[25vw]" src={product} alt="VideoInput Image"/>
                        </div>
                        <div className="flex flex-col gap-[1.5vw] w-[30vw]">
                            <h4 className="text-3xl font-light">Our Mission</h4>
                            <p className="text-base md:text-lg font-extralight">

                            We are on a mission to empower content creators to amplify their voices and reach new heights.

                            Upload your instagram reels, tiktoks and other short form videos into viral Linkedin posts.

                            </p>
                        </div>
                    </motion.div>
                    <motion.div 
                        ref={ref3}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: inView3 ? 1 : 0, x: inView3 ? 0 : 100 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-row-reverse justify-between items-center"
                    >
                        <div className="bg-[rgba(247,199,202,1.0)] rounded-xl pl-[2vw] pr-[2vw] pt-10 pb-10" >
                            <Image className="w-[25vw]" src={themeeno2} alt="VideoInput Image"/>
                        </div>
                        <div className="flex flex-col gap-[1.5vw] w-[30vw]">
                            <h4 className="text-3xl font-light">Who are we?</h4>
                            <p className="text-base md:text-lg font-extralight"> At GhostLink, we are a team driven by authenticity, purpose, and values. We believe in empowering content creators to stay true to their unique voices while amplifying their reach. Our purpose is to revolutionize the way creators transform short-form videos into high-engagement LinkedIn posts, helping them unlock new opportunities and connections. We are guided by a commitment to innovation, collaboration, and excellence. </p>
                        </div>
                    </motion.div>
                    <motion.div 
                        ref={ref4}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: inView4 ? 1 : 0, x: inView4 ? 0 : -100 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-center"
                    >
                        <div className="bg-[rgba(243,240,196,1.0)] rounded-xl pl-[2vw] pr-[2vw] pt-10 pb-10" >
                            <Image className="w-[25vw]" src={waitlist} alt="VideoInput Image"/>
                        </div>
                        <div className="flex flex-col gap-[1.5vw] w-[30vw]">
                            <h4 className="text-3xl font-light">Our Product</h4>
                            <p className="text-base md:text-lg font-extralight"> Our AI technology is designed to preserve the authenticity of creators’ content while delivering best-in-class solutions to help them grow and thrive. At GhostLink, we don’t just build tools—we help creators shape their story and share it with the world. With a passion for purpose-driven work and values that center around growth, authenticity, and persistence, we aim to create meaningful connections between creators and their audiences. Join the waitlist today!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <motion.div
                ref={ref5}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView5 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-[60vh] w-full flex-col items-center justify-center text-white mt-6"
            >
                <h4 className="mb-8 w-full max-w-[37vw] text-3xl md:text-5xl text-center font-light">
                Ditch the ghostwriters and elevate your engagement.
                </h4>
                <div className="flex bg-[#f5f5f7] gap-2 md:gap-[1vw] pt-1 pb-1 pl-4 pr-1 rounded-md w-full max-w-[400px]">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-transparent text-black focus:outline-none text-base md:text-lg w-full" 
                    value={email} 
                    onChange={handleChange}
                />
                <button className="btn btn-primary" onClick={handleWaitlist}>
                    Join Waitlist
                </button>
                </div>
            </motion.div>
        </div>
    );
}
