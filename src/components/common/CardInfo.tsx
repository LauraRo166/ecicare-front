import React from "react";

interface CardInfoProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const CardInfo: React.FC<CardInfoProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl shadow-md flex items-center space-x-4">
      {icon && <div className="text-sky-400 text-3xl">{icon}</div>}
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </div>
    </div>
  );
};

export default CardInfo;
