import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textcolor = " text-white",
  className = "",
  ...props
}) {
  console.log(type);
  return (
    <button
      // type="submit"
      className = {`px-4 py-4 rounded-lg ${bgColor} ${textcolor} ${className} `} {...props} >
      {children}
    </button>
  );
}


// react hook - forward reference (read about this hooks)