import { Image, CalendarDays, BadgeInfo, Plus } from "lucide-react";

const IconsSection = () => {
  // Define the click handlers for each icon
  const handleImageClick = () => {
    console.log("Image icon clicked");
    // Add functionality here, such as opening an image upload dialog
  };

  const handleCalendarClick = () => {
    console.log("Calendar icon clicked");
    // Add functionality here, such as setting a reminder or adding a date
  };

  const handleBadgeClick = () => {
    console.log("Badge icon clicked");
    // Add functionality here, such as showing post details or tips
  };

  const handlePlusClick = () => {
    console.log("Plus icon clicked");
    // Add functionality here, such as adding a new element or item
  };

  return (
    <div className="ml-5 flex h-[50px] w-full items-center gap-7">
      <button
        onClick={handleImageClick}
        className="hover:bg-gray-200 rounded-full p-1"
        aria-label="Upload Image"
      >
        <Image size={22} />
      </button>
      <button
        onClick={handleCalendarClick}
        className="hover:bg-gray-200 rounded-full p-1"
        aria-label="Open Calendar"
      >
        <CalendarDays size={22} />
      </button>
      <button
        onClick={handleBadgeClick}
        className="hover:bg-gray-200 rounded-full p-1"
        aria-label="Show Badge Info"
      >
        <BadgeInfo size={22} />
      </button>
      <button
        onClick={handlePlusClick}
        className="hover:bg-gray-200 rounded-full p-1"
        aria-label="Add New Item"
      >
        <Plus size={22} />
      </button>
    </div>
  );
};

export default IconsSection;
