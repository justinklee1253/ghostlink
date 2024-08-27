"use client";
import { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transcribeVideo`,
        {
          method: "POST",
          body: formData,
          //   headers: {
          //     Authorization: `Bearer ${clerkId}`,
          //   },
        }
      );
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <>
      <h1 className="flex text-3xl">Please select a file to upload!</h1>
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
    </>
  );
};

export default FileUpload;
