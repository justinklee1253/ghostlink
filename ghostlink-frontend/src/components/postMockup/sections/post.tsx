import { Clock5 } from "lucide-react";

const PostButtonSection = () => {
  return (
    <div className="border-black-100 flex h-[50px] w-full border-t">
      <div className="ml-auto flex flex-row items-center gap-3">
        <div className="mb-1 flex h-[22px] w-[22px]">
          <Clock5 />
        </div>
        <button className="text-md btn btn-primary btn-sm mr-3 h-[10px] w-[70px] rounded-full text-white">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostButtonSection;
