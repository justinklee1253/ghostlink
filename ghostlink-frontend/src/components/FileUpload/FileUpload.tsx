"use client";
import { useState } from "react";

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setTimeout(() => {
          setStatus("Transcribing...");
        }, 2000); // Simulate time for transcription

        const data = await response.json();
        setTimeout(() => {
          setStatus("Generating post...");
        }, 4000); // Simulate time for generating post

        setTimeout(() => {
          setLinkedinPost(data.linkedin_post);
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
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl text-center">Please select a file to upload!</h1>
      <div className="flex flex-row items-center justify-center mt-9 w-full max-w-md">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
          disabled={status !== "" && status !== "Completed!"} // Disable during upload
        />
        <button
          className="btn btn-ghost ml-3"
          onClick={handleFileSubmit}
          disabled={status !== "" && status !== "Completed!"}
        >
          {status || "Upload"}
        </button>
      </div>

      {status !== "" && status !== "Completed!" && (
        <div className="w-full bg-gray-200 rounded-full mt-6 max-w-md h-6">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full animate-loading"
          >
            {status}
          </div>
        </div>
      )}

      {linkedinPost && (
        <div className="mt-6 w-full max-w-2xl text-center">
          <h2 className="text-xl font-bold">Generated LinkedIn Post:</h2>
          <p className="mt-4 text-justify">{linkedinPost}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
