import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';


const CaseEinvoice = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Retrieve formData from state

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Case Details", 20, 20);
    doc.text(`Title: ${formData.caseTitle}`, 20, 30);
    doc.text(`Number: ${formData.caseNumber}`, 20, 40);
    doc.text(`Client: ${formData.clientName}`, 20, 50);
    doc.text(`Description: ${formData.caseDescription}`, 20, 60);
    doc.text(`Date: ${formData.caseDate}`, 20, 70);
    doc.text(`Type: ${formData.caseType}`, 20, 80);
    doc.save('case-details.pdf');
  };

  if (!formData) {
    return <p>No case details available. Please submit the form first.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Case Details</h1>
        <div className="mb-6">
          <p><strong>Title:</strong> {formData.caseTitle}</p>
          <p><strong>Number:</strong> {formData.caseNumber}</p>
          <p><strong>Client:</strong> {formData.clientName}</p>
          <p><strong>Description:</strong> {formData.caseDescription}</p>
          <p><strong>Date:</strong> {formData.caseDate}</p>
          <p><strong>Type:</strong> {formData.caseType}</p>
        </div>
        <button
          onClick={generatePDF}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default CaseEinvoice
