import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const Lawyers = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Jane Doe", content: "Exceptional service and professionalism!", rating: 5 },
    { id: 2, name: "Michael Brown", content: "Highly recommended for corporate law matters.", rating: 4 },
  ]);

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === "" || newRating === 0) return;

    const newReviewObj = {
      id: reviews.length + 1,
      name: "Anonymous",
      content: newReview,
      rating: newRating,
    };

    setReviews([...reviews, newReviewObj]);
    setNewReview("");
    setNewRating(0);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
        size={20}
      />
    ));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <div className="flex flex-col md:flex-row">
        {/* Left Column: Profile Image and Basic Info */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start border-r border-gray-200 pr-8 mb-8 md:mb-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full w-40 h-40 md:w-48 md:h-48 mb-4 shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 text-center md:text-left">John Doe</h1>
          <p className="text-gray-600 mt-2 text-center md:text-left">Corporate Lawyer with 20 Years of Experience</p>
          <p className="text-gray-600 mt-1 text-center md:text-left">Location: New York, NY</p>

          {/* Profile Rating */}
          <div className="flex items-center mt-4">
            {renderStars(5)}
            <span className="ml-2 text-gray-600">(5.0)</span>
          </div>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="md:w-2/3 pl-0 md:pl-8">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Me</h2>
            <p className="text-gray-700">
              Highly experienced corporate lawyer with a deep understanding of business law, mergers and acquisitions, and contract negotiation. Dedicated to providing top-notch legal services to businesses of all sizes.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Experience</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-4">
              <li>
                <span className="font-semibold">Senior Corporate Lawyer</span> - XYZ Law Firm (2010 - Present)
                <p className="ml-4">Managed legal aspects of high-profile corporate transactions, mergers, and acquisitions.</p>
              </li>
              <li>
                <span className="font-semibold">Corporate Associate</span> - ABC Law Firm (2005 - 2010)
                <p className="ml-4">Provided legal counsel on corporate governance and regulatory compliance.</p>
              </li>
            </ul>
          </div>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Education</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-4">
              <li>
                <span className="font-semibold">Juris Doctor (JD)</span> - Harvard Law School (2002 - 2005)
              </li>
              <li>
                <span className="font-semibold">Bachelor of Arts in Political Science</span> - University of California, Berkeley (1998 - 2002)
              </li>
            </ul>
          </div>

          <div className="pb-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Experties</h2>
            <div className="flex flex-wrap gap-4 text-gray-700">
              <span className="bg-gray-200 py-2 px-4 rounded-lg shadow-inner">Corporate Law</span>
              <span className="bg-gray-200 py-2 px-4 rounded-lg shadow-inner">Contract Negotiation</span>
              <span className="bg-gray-200 py-2 px-4 rounded-lg shadow-inner">Mergers & Acquisitions</span>
              <span className="bg-gray-200 py-2 px-4 rounded-lg shadow-inner">Regulatory Compliance</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact</h2>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 p-2 rounded shadow-sm"
              />
              <textarea
                placeholder="Your Message"
                className="border border-gray-300 p-2 rounded shadow-sm"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 shadow-lg"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Client Reviews</h2>
        <form onSubmit={handleReviewSubmit} className="flex flex-col space-y-4 mb-4">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review"
            className="border border-gray-300 p-2 rounded shadow-sm"
          ></textarea>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${i < newRating ? "text-yellow-500" : "text-gray-300"} cursor-pointer`}
                size={30}
                onClick={() => setNewRating(i + 1)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 shadow-lg"
          >
            Submit Review
          </button>
        </form>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 p-4 rounded shadow-sm">
              <div className="flex items-center">
                <p className="font-semibold text-lg">{review.name}</p>
                <div className="flex ml-2">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lawyers;
