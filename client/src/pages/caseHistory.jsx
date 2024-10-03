import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { useHistory } from 'react-router-dom';

const CaseHistory = () => {
  const [cases, setCases] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Retrieve previously submitted cases from localStorage
    const storedCases = JSON.parse(localStorage.getItem('submittedCases')) || [];
    setCases(storedCases);
  }, []);

  const generatePDF = (caseData) => {
    const doc = new jsPDF();
    const { caseTitle, clientName, phoneNumber, caseDescription, caseDate, caseType, submittedOn } = caseData;
    doc.text('Case Details', 20, 20);
    doc.text(`Case Title: ${caseTitle}`, 20, 30);
    doc.text(`Client Name: ${clientName}`, 20, 40);
    doc.text(`Phone Number: ${phoneNumber}`, 20, 50);
    doc.text(`Description: ${caseDescription}`, 20, 60);
    doc.text(`Case Date: ${caseDate}`, 20, 70);
    doc.text(`Case Type: ${caseType}`, 20, 80);
    doc.text(`Submitted On: ${submittedOn}`, 20, 90);

    // Save the PDF with a dynamic name based on case date and type
    const fileName = `${caseDate.replace(/-/g, '')}_${caseType.replace(/\s+/g, '-')}.pdf`;
    doc.save(fileName);
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
