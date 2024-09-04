import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textcolor = " text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-4 rounded-lg ${bgColor} ${textcolor} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;


// react hook - forward reference (read about this hooks)