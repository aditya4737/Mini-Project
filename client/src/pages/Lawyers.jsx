import React, { useState } from 'react';

const Lawyers = () => {
  // State to manage sorting and filters
  const [sortBy, setSortBy] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [ratingRange, setRatingRange] = useState({ from: 1, to: 5 });
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State to manage mobile panel visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setSelectedSpecializations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleRatingChange = (e) => {
    const { id, value } = e.target;
    setRatingRange((prev) => ({
      ...prev,
      [id]: value ? parseInt(value) : prev[id],
    }));
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Toggle panel visibility
  };

  const lawyersData = [
    {
      id: 1,
      name: "John Doe",
      specialization: "Criminal Law",
      location: "New York",
      experience: 10,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1606189932951-48e4efbb64d4",
    },
    {
      id: 2,
      name: "Jane Smith",
      specialization: "Corporate Law",
      location: "Los Angeles",
      experience: 8,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1573497019419-2e4d5b70fbd8",
    },
    {
      id: 3,
      name: "Michael Brown",
      specialization: "Family Law",
      location: "Chicago",
      experience: 12,
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    },
    {
      id: 4,
      name: "Emily Davis",
      specialization: "Criminal Law",
      location: "San Francisco",
      experience: 15,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1589571894960-20bbe2828d12",
    },
    {
      id: 5,
      name: "William Johnson",
      specialization: "Corporate Law",
      location: "Houston",
      experience: 7,
      rating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1603415526960-304fcbf650b4",
    },
    // Add more lawyer objects as needed
  ];

  // Filter and sort lawyers data
  const filteredLawyers = lawyersData
    .filter((lawyer) =>
      (selectedSpecializations.length === 0 || selectedSpecializations.includes(lawyer.specialization)) &&
      (selectedLocations.length === 0 || selectedLocations.includes(lawyer.location)) &&
      lawyer.rating >= ratingRange.from &&
      lawyer.rating <= ratingRange.to
    )
    .sort((a, b) => {
      if (sortBy === 'Experience, ASC') return a.experience - b.experience;
      if (sortBy === 'Experience, DESC') return b.experience - a.experience;
      if (sortBy === 'Rating, ASC') return a.rating - b.rating;
      if (sortBy === 'Rating, DESC') return b.rating - a.rating;
      return 0;
    });

  return (
    <div>
      <section>
        <div className="min-h-screen flex flex-col mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Lawyer Directory</h2>
            <p className="mt-4 max-w-md text-gray-500">
              Find and connect with experienced lawyers across various specializations and locations.
            </p>
          </header>

          <div className="lg:flex lg:gap-8">
            <aside className="lg:w-1/4 lg:flex-shrink-0">
              {/* PC View Filters and Sorting */}
              <div className="hidden lg:block">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700"> Sort By </label>
                    <select id="SortBy" className="mt-1 rounded border-gray-300 text-sm" onChange={handleSortChange} value={sortBy}>
                      <option value="">Sort By</option>
                      <option value="Experience, DESC">Experience, DESC</option>
                      <option value="Experience, ASC">Experience, ASC</option>
                      <option value="Rating, DESC">Rating, DESC</option>
                      <option value="Rating, ASC">Rating, ASC</option>
                    </select>
                  </div>

                  <div>
                    <p className="block text-xs font-medium text-gray-700">Filters</p>
                    <div className="space-y-4">
                      <details className="overflow-hidden rounded border border-gray-300">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span className="text-sm font-medium">Specialization</span>
                          <span className="transition group-open:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                          <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700">{selectedSpecializations.length} Selected</span>
                            <button
                              type="button"
                              className="text-sm text-gray-900 underline underline-offset-4"
                              onClick={() => setSelectedSpecializations([])}
                            >
                              Reset
                            </button>
                          </header>

                          <ul className="space-y-1 border-t border-gray-200 p-4">
                            {["Criminal Law", "Corporate Law", "Family Law"].map((specialization) => (
                              <li key={specialization}>
                                <label className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    value={specialization}
                                    className="size-5 rounded border-gray-300"
                                    checked={selectedSpecializations.includes(specialization)}
                                    onChange={handleSpecializationChange}
                                  />
                                  <span className="text-sm font-medium text-gray-700">{specialization}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>

                      <details className="overflow-hidden rounded border border-gray-300">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span className="text-sm font-medium">Location</span>
                          <span className="transition group-open:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                          <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700">{selectedLocations.length} Selected</span>
                            <button
                              type="button"
                              className="text-sm text-gray-900 underline underline-offset-4"
                              onClick={() => setSelectedLocations([])}
                            >
                              Reset
                            </button>
                          </header>

                          <ul className="space-y-1 border-t border-gray-200 p-4">
                            {["New York", "Los Angeles", "Chicago", "San Francisco", "Houston"].map((location) => (
                              <li key={location}>
                                <label className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    value={location}
                                    className="size-5 rounded border-gray-300"
                                    checked={selectedLocations.includes(location)}
                                    onChange={handleLocationChange}
                                  />
                                  <span className="text-sm font-medium text-gray-700">{location}</span>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>

                      <details className="overflow-hidden rounded border border-gray-300">
                        <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                          <span className="text-sm font-medium">Rating</span>
                          <span className="transition group-open:-rotate-180">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </summary>

                        <div className="border-t border-gray-200 bg-white">
                          <header className="flex items-center justify-between p-4">
                            <span className="text-sm text-gray-700">Rating Range</span>
                            <button
                              type="button"
                              className="text-sm text-gray-900 underline underline-offset-4"
                              onClick={() => setRatingRange({ from: 1, to: 5 })}
                            >
                              Reset
                            </button>
                          </header>

                          <div className="space-y-4 p-4">
                            <label htmlFor="from" className="text-sm font-medium text-gray-700">From</label>
                            <input
                              id="from"
                              type="number"
                              min="1"
                              max="5"
                              value={ratingRange.from}
                              onChange={handleRatingChange}
                              className="w-full rounded border-gray-300 text-sm"
                            />

                            <label htmlFor="to" className="text-sm font-medium text-gray-700">To</label>
                            <input
                              id="to"
                              type="number"
                              min="1"
                              max="5"
                              value={ratingRange.to}
                              onChange={handleRatingChange}
                              className="w-full rounded border-gray-300 text-sm"
                            />
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <main className="lg:w-3/4">
  <div className="relative lg:hidden">
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="text-sm font-medium text-gray-700"
    >
      Filters
    </button>

    {dropdownOpen && (
      <div className="absolute top-full right-0 z-40 mt-2 w-full bg-white border border-gray-300 shadow-lg">
        <div className="p-4">
          <div>
            <label htmlFor="SortByMobile" className="block text-xs font-medium text-gray-700"> Sort By </label>
            <select id="SortByMobile" className="mt-1 rounded border-gray-300 text-sm" onChange={handleSortChange} value={sortBy}>
              <option value="">Sort By</option>
              <option value="Experience, DESC">Experience, DESC</option>
              <option value="Experience, ASC">Experience, ASC</option>
              <option value="Rating, DESC">Rating, DESC</option>
              <option value="Rating, ASC">Rating, ASC</option>
            </select>
          </div>

          <div className="mt-4">
            <p className="block text-xs font-medium text-gray-700">Filters</p>
            <div className="space-y-4">
              <details className="overflow-hidden rounded border border-gray-300">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                  <span className="text-sm font-medium">Specialization</span>
                  <span className="transition group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700">{selectedSpecializations.length} Selected</span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                      onClick={() => setSelectedSpecializations([])}
                    >
                      Reset
                    </button>
                  </header>

                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    {["Criminal Law", "Corporate Law", "Family Law"].map((specialization) => (
                      <li key={specialization}>
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={specialization}
                            className="size-5 rounded border-gray-300"
                            checked={selectedSpecializations.includes(specialization)}
                            onChange={handleSpecializationChange}
                          />
                          <span className="text-sm font-medium text-gray-700">{specialization}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="overflow-hidden rounded border border-gray-300">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                  <span className="text-sm font-medium">Location</span>
                  <span className="transition group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700">{selectedLocations.length} Selected</span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                      onClick={() => setSelectedLocations([])}
                    >
                      Reset
                    </button>
                  </header>

                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    {["New York", "Los Angeles", "Chicago", "San Francisco", "Houston"].map((location) => (
                      <li key={location}>
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={location}
                            className="size-5 rounded border-gray-300"
                            checked={selectedLocations.includes(location)}
                            onChange={handleLocationChange}
                          />
                          <span className="text-sm font-medium text-gray-700">{location}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="overflow-hidden rounded border border-gray-300">
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                  <span className="text-sm font-medium">Rating</span>
                  <span className="transition group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    <span className="text-sm text-gray-700">Rating Range</span>
                    <button
                      type="button"
                      className="text-sm text-gray-900 underline underline-offset-4"
                      onClick={() => setRatingRange({ from: 1, to: 5 })}
                    >
                      Reset
                    </button>
                  </header>

                  <div className="space-y-4 p-4">
                    <label htmlFor="from" className="text-sm font-medium text-gray-700">From</label>
                    <input
                      id="from"
                      type="number"
                      min="1"
                      max="5"
                      value={ratingRange.from}
                      onChange={handleRatingChange}
                      className="w-full rounded border-gray-300 text-sm"
                    />

                    <label htmlFor="to" className="text-sm font-medium text-gray-700">To</label>
                    <input
                      id="to"
                      type="number"
                      min="1"
                      max="5"
                      value={ratingRange.to}
                      onChange={handleRatingChange}
                      className="w-full rounded border-gray-300 text-sm"
                    />
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {filteredLawyers.map((lawyer) => (
      <div key={lawyer.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <img
          src={lawyer.imageUrl}
          alt={lawyer.name}
          className="w-full h-32 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{lawyer.name}</h3>
          <p className="text-sm text-gray-600">{lawyer.specialization}</p>
          <p className="text-sm text-gray-600">{lawyer.location}</p>
          <p className="text-sm text-gray-600">Experience: {lawyer.experience} years</p>
          <p className="text-sm text-gray-600">Rating: {lawyer.rating}</p>
        </div>
      </div>
    ))}
  </div>
</main>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Lawyers;
