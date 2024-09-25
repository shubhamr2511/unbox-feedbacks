import React from 'react';

const Button = ({props}) => {
    const bgColor = props.bgColor ?? "bg-black";
    
  return (
    <button
    onClick={props.onClick}
    type={props.type}
    className={`w-full font-semibold ${props.textSize??""} ${bgColor=="bg-black"?"text-white":(props.textColor??"")} py-5 px-3 rounded-2xl ${bgColor}`}>
   { props.text}
  </button>
  );
};

export default Button;
