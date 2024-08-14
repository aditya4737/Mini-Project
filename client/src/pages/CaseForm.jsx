import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaseForm = () => {
  const [formData, setFormData] = useState({
    caseTitle: '',
    caseNumber: '',
    clientName: '',
    caseDescription: '',
    caseDate: '',
    caseType: '',
  });

  const navigate = useNavigate(); // useNavigate hook to handle redirection

  const caseTypes = [
    { label: 'Civil', value: 'civil' },
    { label: 'Criminal', value: 'criminal' },
    { label: 'Family', value: 'family' },
    { label: 'Corporate', value: 'corporate' },
    { label: 'Labor', value: 'labor' },
    { label: 'Intellectual Property', value: 'intellectual_property' },
    { label: 'Real Estate', value: 'real_estate' },
    { label: 'Tax', value: 'tax' },
    { label: 'Environmental', value: 'environmental' },
    { label: 'Bankruptcy', value: 'bankruptcy' },
    { label: 'Immigration', value: 'immigration' },
    { label: 'Personal Injury', value: 'personal_injury' },
    { label: 'Medical Malpractice', value: 'medical_malpractice' },
    { label: 'Product Liability', value: 'product_liability' },
    { label: 'Trusts and Estates', value: 'trusts_and_estates' },
    { label: 'Contract', value: 'contract' },
    { label: 'Construction', value: 'construction' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Employment', value: 'employment' },
    { label: 'Consumer Protection', value: 'consumer_protection' },
    { label: 'Health Care', value: 'health_care' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Education', value: 'education' },
    { label: 'Public Interest', value: 'public_interest' },
    { label: 'Antitrust', value: 'antitrust' },
    { label: 'Aviation', value: 'aviation' },
    { label: 'Maritime', value: 'maritime' },
    { label: 'Securities', value: 'securities' },
    { label: 'Military', value: 'military' },
    { label: 'Cybersecurity', value: 'cybersecurity' },
    { label: 'Telecommunications', value: 'telecommunications' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log(formData);
    navigate('/CaseEinvoice', { state: { formData } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Case Details Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="caseTitle">Case Title</label>
            <input
              type="text"
              id="caseTitle"
              name="caseTitle"
              value={formData.caseTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="caseNumber">Case Number</label>
            <input
              type="text"
              id="caseNumber"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="caseDescription">Case Description</label>
            <textarea
              id="caseDescription"
              name="caseDescription"
              value={formData.caseDescription}
              onChange={handleChange}
              className="w-full px-4 py-3 h-40 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="caseDate">Case Date</label>
            <input
              type="date"
              id="caseDate"
              name="caseDate"
              value={formData.caseDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="caseType">Case Type</label>
            <select
              id="caseType"
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select Case Type</option>
              {caseTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CaseForm;
