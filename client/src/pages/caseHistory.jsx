import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve previously submitted cases from localStorage
    const storedCases = JSON.parse(localStorage.getItem('submittedCases')) || [];
    setCases(storedCases);
  }, []);

  const generatePDF = (caseData) => {
    const doc = new jsPDF();
    const {
      caseTitle = 'N/A',
      clientName = 'N/A',
      phoneNumber = 'N/A',
      caseDescription = 'N/A',
      caseDate = 'N/A',
      caseType = 'N/A',
      submittedOn = 'N/A',
    } = caseData;
  
    // Add text content
    doc.text('Case Details', 20, 20);
    doc.text(`Case Title: ${String(caseTitle)}`, 20, 30);
    doc.text(`Client Name: ${String(clientName)}`, 20, 40);
    doc.text(`Phone Number: ${String(phoneNumber)}`, 20, 50);
    doc.text(`Description: ${String(caseDescription)}`, 20, 60);
    doc.text(`Case Date: ${String(caseDate)}`, 20, 70);
    doc.text(`Case Type: ${String(caseType)}`, 20, 80);
    doc.text(`Submitted On: ${String(submittedOn)}`, 20, 90);

    // Save the PDF with a sanitized name based on case date and type
    const fileName = `${caseDate.replace(/-/g, '')}_${caseType.replace(/\s+/g, '-')}.pdf`;
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_]/g, '');
    doc.save(sanitizedFileName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Case History</h1>

        {cases.length > 0 ? (
          <div>
            <h2 className="text-xl mb-4">Your Submitted Cases</h2>
            <div className="space-y-6">
              {cases.map((caseData, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 className="text-lg font-medium">Case Title: {caseData.caseTitle}</h3>
                  <p><strong>Client Name:</strong> {caseData.clientName}</p>
                  <p><strong>Date Submitted:</strong> {caseData.submittedOn}</p>
                  <p><strong>Case Date:</strong> {caseData.caseDate}</p>
                  <p><strong>Case Type:</strong> {caseData.caseType}</p>
                  <button
                    onClick={() => generatePDF(caseData)}
                    className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No cases have been submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default CaseHistory;
