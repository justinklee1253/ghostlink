import FileUpload from "@/components/FileUpload/FileUpload";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center min-h-screen w-[40vw]">
        <h1 className="text-center text-5xl font-bold mb-8">
          Welcome to GhostWriter
        </h1>
        <p className="text-center text-lg mb-8">
          An all-in-one platform that makes video transcription simple and helps
          you create impactful LinkedIn posts that drive high engagement.
        </p>
        <div className="w-full flex justify-center">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
