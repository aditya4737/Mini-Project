// src/components/LawyerCard.js
import React from 'react';

const LawyerCard = ({ lawyer }) => {
  return (
    <div key={lawyer.id} className="border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={lawyer.imageUrl}
        alt={lawyer.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{lawyer.name}</h3>
        <p className="text-sm text-gray-600">{lawyer.specialization}</p>
        <p className="text-sm text-gray-600">{lawyer.location}</p>
        <p className="text-sm text-gray-600">Experience: {lawyer.experience} years</p>
        <p className="text-sm text-gray-600">Rating: {lawyer.rating}</p>
      </div>
    </div>
  );
};

export default LawyerCard;
