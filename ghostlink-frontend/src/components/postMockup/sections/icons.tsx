import { Image, CalendarDays, BadgeInfo, Plus } from "lucide-react";

const IconsSection = () => {
  return (
    <div className="ml-5 flex h-[50px] w-full items-center gap-7">
      <Image size={22} /> <CalendarDays size={22} /> <BadgeInfo size={22} />{" "}
      <Plus size={22} />
    </div>
  );
};

export default IconsSection;
