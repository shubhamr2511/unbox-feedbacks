import React from 'react';

const Button = ({props}) => {
    const bgColor = props.bgColor ?? "bg-black";
    
  return (
    <button
    onClick={props.onClick}
    type={props.type}
    className={`w-full font-semibold ${bgColor=="bg-black"?"text-white":""} p-3 rounded-none ${bgColor}`}>
   { props.text}
  </button>
  );
};

export default Button;
