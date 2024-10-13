import React from 'react';
import { Link } from 'react-router-dom';

function Card({ imageUrl, title, description, subheading, link, bgColor }) {
  return (
    <article className={`flex  transition hover:shadow-xl ${bgColor}`}>
      <div className="hidden sm:block sm:basis-56">
        <img
          alt=""
          src={imageUrl}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <h3 className="font-bold uppercase text-gray-900">{title}</h3>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {subheading}
          </p>
          <p className="mt-2 text-sm/relaxed text-gray-700">{description}</p>
          <Link
            to={link}
            className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Card;
