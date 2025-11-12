import React from "react";
import { Link } from "react-router-dom";

interface ActionCardProps {
  logo: string;
  title: string;
  to: string;
  className?: string;
}

const CardAction: React.FC<ActionCardProps> = ({
  logo,
  title,
  to,
  className,
}) => {
  return (
    <Link
      to={to}
      className={`
        group flex flex-col items-center justify-center p-6
        bg-[rgba(10,25,47,0.5)]
        rounded-[15px]
        border-2 border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
        backdrop-blur-[10px]
        w-[90%] max-w-[75vw] min-w-[20vw]
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:border-white/20 hover:bg-[rgba(10,25,47,0.7)]
        focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75
        ${className} 
      `}
    >
      <img
        src={logo}
        alt={`${title} logo`}
        className="h-20 w-20 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-center text-lg font-semibold text-slate-100">
        {title}
      </span>
    </Link>
  );
};

export default CardAction;
