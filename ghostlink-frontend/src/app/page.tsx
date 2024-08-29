"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleFileUpload = () => {
    router.push("/uploadFile");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex min-h-screen w-[40vw] flex-col items-center justify-center">
        <h1 className="mb-8 text-center text-5xl font-bold font-medium text-white">
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
      </div>
    </div>
  );
}
