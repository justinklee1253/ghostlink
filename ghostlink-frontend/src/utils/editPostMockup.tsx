"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface EditPostProps {
  postContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
  componentsStyle: any;
}

const EditPostMockup = ({ postContent, onSave, onCancel, componentsStyle }: EditPostProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(postContent);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(postContent);
    onCancel();
    setIsEditing(false);
  };

  return (
    <div className="mb-3 ml-10 mr-10 mt-4 h-[530px] overflow-y-auto">
      {isEditing ? (
        <>
          <textarea
            className="h-full w-full rounded-md p-2 text-black"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="mt-2 flex justify-end gap-2">
          <button className="text-md btn btn-primary btn-sm h-[22px] w-[70px] rounded-full text-white"
            onClick={handleSave}>
            Save
            </button>
          <button className="text-md btn btn-secondary btn-sm h-[22px] w-[70px] rounded-full"
            onClick={handleCancel}>
            Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]} components={componentsStyle}>
            {postContent}
          </ReactMarkdown>
          <button className="text-md btn btn-primary btn-sm h-[22px] w-[70px] rounded-full text-white"
            onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EditPostMockup;
