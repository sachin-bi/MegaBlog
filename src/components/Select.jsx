import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId(); //taking id to attach in htmlfor

  return (
    <div className="w-full">
      {/* // "html ka structure na bigreh" - thats why label kept here */}
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg Ibg-white text-black outline-none focus: bg-gray-50 duration-200 border border-gray-200 w-full ${className} `}
      >
        {
            options?.map((item)=>(
                <option key={item} value={item}>{item}</option>
            ))
        }
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
