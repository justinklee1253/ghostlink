"use client";
import { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkedinPost, setLinkedinPost] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("videoFile", selectedFile);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLinkedinPost(data.linkedin_post);
      } else {
        alert("An error occurred during file upload");
      }
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Please select a file to upload!</h1>
      <div className="flex flex-row items-center justify-around mt-9">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
        />
        <button className="btn btn-ghost ml-3" onClick={handleFileSubmit}>
          Upload
        </button>
      </div>

      {linkedinPost && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Generated LinkedIn Post:</h2>
          <p className="mt-4">{linkedinPost}</p>
        </div>
      )}
    </>
  );
};

export default FileUpload;
