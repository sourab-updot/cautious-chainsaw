import React from "react";

const ImageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-between image-container opacity-100 hover:!opacity-100 hover:!z-[999] ease-in-out duration-500">
      {children}
    </div>
  );
};

export default ImageWrapper;
