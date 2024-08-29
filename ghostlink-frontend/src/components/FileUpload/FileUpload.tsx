"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkedinPost, setLinkedinPost] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setLinkedinPost(null);
      setStatus("");
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    setStatus("Uploading video...");

    try {
      const formData = new FormData();
      formData.append("videoFile", selectedFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      console.log("RESPONSE: ", response);

      if (response.ok) {
        setTimeout(() => {
          setStatus("Transcribing...");
        }, 2000); // Simulate time for transcription

        const data = await response.json();
        setTimeout(() => {
          setStatus("Generating post...");
        }, 4000); // Simulate time for generating post

        setTimeout(() => {
          setLinkedinPost(data.linkedin_post_4o);
          setStatus("Completed!");
        }, 6000); // Complete the process
      } else {
        alert("An error occurred during file upload");
        setStatus("");
      }
    } catch (e) {
      console.log("ERROR: ", e);
      setStatus("");
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-center text-3xl text-white">
        Please select a file to upload!
      </h1>
      <div className="mt-9 flex w-full max-w-md flex-row items-center justify-center">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
          disabled={status !== "" && status !== "Completed!"} // Disable during upload
        />
        <button
          className="btn btn-primary ml-3"
          onClick={handleFileSubmit}
          disabled={status !== "" && status !== "Completed!"}
        >
          {status || "Upload"}
        </button>
      </div>

      {status !== "" && status !== "Completed!" && (
        <div className="mt-6 h-6 w-full max-w-md rounded-full bg-gray-200">
          <div className="animate-loading h-full rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100">
            {status}
          </div>
        </div>
      )}

      {linkedinPost && (
        <div className="mt-6 w-full max-w-2xl text-center">
          <h2 className="text-xl font-bold text-white">
            Generated LinkedIn Post:
          </h2>
          <p className="mt-4 text-justify text-white">
            {" "}
            <ReactMarkdown>{linkedinPost}</ReactMarkdown>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
