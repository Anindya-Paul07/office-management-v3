import React from 'react';

const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`p-4 rounded-xl shadow-md ${color} text-white`}>
      <h2 className="text-lg">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;