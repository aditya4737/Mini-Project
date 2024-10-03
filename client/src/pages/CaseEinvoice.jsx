// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import jsPDF from 'jspdf';

// const CaseEinvoice = () => {
//   const location = useLocation();
//   const { formData } = location.state || {}; // Retrieve formData from state

//   const [email, setEmail] = useState(''); // Manual email input
//   const [currentDate, setCurrentDate] = useState('');

//   // Set the current date when the component loads
//   useEffect(() => {
//     const today = new Date().toLocaleDateString(); // Format the date as per requirement
//     setCurrentDate(today);
//   }, []);

//   const generatePDF = () => {
//     // Check if formData and caseDate are defined
//     if (!formData) {
//       alert('No case details available. Please submit the form first.');
//       return;
//     }
    
//     if (!formData.caseDate) {
//       alert('Case date is not available.');
//       return;
//     }

//     const doc = new jsPDF();
//     const caseDateTime = `${formData.caseDate.replace(/-/g, '')}-${new Date().getTime()}`;
//     const fileName = `${caseDateTime}-${formData.caseType}.pdf`;

//     doc.text("Case Details", 20, 20);
//     doc.text(`Case Title: ${formData.caseTitle}`, 20, 30);
//     doc.text(`Phone Number: ${formData.phoneNumber}`, 20, 40);
//     doc.text(`Client Name: ${formData.clientName}`, 20, 50);
//     doc.text(`Description: ${formData.caseDescription}`, 20, 60);
//     doc.text(`Date: ${formData.caseDate}`, 20, 70);
//     doc.text(`Type: ${formData.caseType}`, 20, 80);
//     doc.text(`Email: example@gmail.com`, 20, 90);  // Default email in PDF
//     doc.text(`Submitted On: ${currentDate}`, 20, 100);  // Added Current Date

//     return { doc, fileName }; // Return doc and filename for reuse
//   };

//   const downloadPDF = () => {
//     const { doc, fileName } = generatePDF();
//     doc.save(fileName); // Save PDF to user's device
//   };

//   const sendEmail = (doc, fileName, recipientEmail) => {
//     const formDataToSend = new FormData();

//     // Convert the PDF into a blob
//     const pdfBlob = doc.output('blob');
//     formDataToSend.append('file', pdfBlob, fileName); // Attach the PDF file
//     formDataToSend.append('email', recipientEmail); // Use provided email

//     fetch('https://your-backend-url/api/send-email', {
//       method: 'POST',
//       body: formDataToSend,
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert(`Email sent successfully to ${recipientEmail}!`);
//         } else {
//           alert('Failed to send email');
//         }
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error);
//         alert('An error occurred');
//       });
//   };

//   const handleSendManualEmail = () => {
//     if (!email) {
//       alert('Please enter an email address');
//       return;
//     }

//     const { doc, fileName } = generatePDF();
//     sendEmail(doc, fileName, email); // Send to manually entered email
//   };

//   const handleSubmit = () => {
//     const { doc, fileName } = generatePDF();
//     sendEmail(doc, fileName, 'example@gmail.com'); // Automatically send to the default email
//   };

//   if (!formData) {
//     return <p>No case details available. Please submit the form first.</p>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-10 rounded shadow-md w-full max-w-2xl">
//         <h1 className="text-3xl font-bold mb-8">Case Details</h1>
//         <div className="mb-6">
//           <p><strong>Case Title:</strong> {formData.caseTitle}</p>
//           <p><strong>Client:</strong> {formData.clientName}</p>
//           <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
//           <p><strong>Date:</strong> {formData.caseDate}</p>
//           <p><strong>Type:</strong> {formData.caseType}</p>
//           <p><strong>Email:</strong> {email || 'Not Provided'}</p>
//           <p><strong>Description:</strong> {formData.caseDescription}</p>
//           <p><strong>Submitted On:</strong> {currentDate}</p>
//         </div>

//         {/* Align Download PDF and Submit buttons on the same row */}
//         <div className="flex gap-4">
//           {/* Download PDF button */}
//           <button
//             onClick={downloadPDF}
//             className="w-1/2 bg-green-500 text-white py-3 rounded hover:bg-green-600"
//           >
//             Download PDF
//           </button>

//           {/* Submit & Send to Default Email button */}
//           <button
//             onClick={handleSubmit}
//             className="w-1/2 bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>

//         <div className="flex gap-4 mt-6">
//           <div className="w-1/2">
//             <input
//               type="email"
//               placeholder="Enter email to send PDF"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           {/* Send PDF via Email button */}
//           <button
//             onClick={handleSendManualEmail}
//             className="w-1/2 bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600"
//           >
//             Send PDF via Email
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseEinvoice;






import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

const DomesticIncidentReport = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Retrieve formData from state

  const [currentDate, setCurrentDate] = useState('');
  const [email, setEmail] = useState('');

  // Set the current date when the component loads
  useEffect(() => {
    const today = new Date().toLocaleDateString(); // Format the date as per requirement
    setCurrentDate(today);
  }, []);

  const generatePDF = () => {
    if (!formData) return;

    const doc = new jsPDF();
    const caseDateTime = `${formData.caseDate.replace(/-/g, '')}-${new Date().getTime()}`;
    const fileName = `${caseDateTime}-Domestic_Incident_Report.pdf`;

    doc.setFontSize(12);
    doc.text("DOMESTIC INCIDENT REPORT UNDER SECTIONS 9 (B) AND 37 (2) (C) OF THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005 (43 OF 2005)", 10, 10);

    // Details of the complainant
    doc.text("1. Details of the complainant/aggrieved person", 10, 20);
    doc.text(`(1) Name of the complainant/aggrieved person: ${formData.complainantName || 'Not Provided'}`, 10, 30);
    doc.text(`(2) Age: ${formData.complainantAge || 'Not Provided'}`, 10, 35);
    doc.text(`(3) Address of the shared household: ${formData.sharedHouseholdAddress || 'Not Provided'}`, 10, 40);
    doc.text(`(4) Present Address: ${formData.presentAddress || 'Not Provided'}`, 10, 45);
    doc.text(`(5) Phone Number, if any: ${formData.phoneNumber || 'Not Provided'}`, 10, 50);

    // Details of Respondents
    doc.text("2. Details of Respondents:", 10, 60);
    formData.respondents.forEach((respondent, index) => {
      const baseY = 65 + index * 40; // Adjust Y position for each respondent
      doc.text(`Sr. No: ${index + 1}`, 10, baseY);
      doc.text(`Name: ${respondent.name || 'Not Provided'}`, 10, baseY + 5);
      doc.text(`Relationship with the aggrieved person: ${respondent.relationship || 'Not Provided'}`, 10, baseY + 10);
      doc.text(`Address: ${respondent.address || 'Not Provided'}`, 10, baseY + 15);
      doc.text(`Telephone: ${respondent.telephone || 'Not Provided'}`, 10, baseY + 20);
    });

    // Details of children
    doc.text("3. Details of children, if any, of the aggrieved person:", 10, 80);
    doc.text(`(a) Number of Children: ${formData.numberOfChildren || 'Not Provided'}`, 10, 90);
    formData.children.forEach((child, index) => {
      const baseY = 95 + index * 40; // Adjust Y position for each child
      doc.text(`i. Name: ${child.name || 'Not Provided'}`, 10, baseY);
      doc.text(`ii. Age: ${child.age || 'Not Provided'}`, 10, baseY + 5);
      doc.text(`iii. Sex: ${child.sex || 'Not Provided'}`, 10, baseY + 10);
      doc.text(`iv. With whom at present residing: ${child.residingWith || 'Not Provided'}`, 10, baseY + 15);
    });

    // Incidents of domestic violence
    doc.text("4. Incidents of domestic violence:", 10, 130);
    formData.incidents.forEach((incident, index) => {
      const baseY = 135 + index * 50; // Adjust Y position for each incident
      doc.text(`i. Sl. No: ${index + 1}`, 10, baseY);
      doc.text(`ii. Date: ${incident.date || 'Not Provided'}`, 10, baseY + 5);
      doc.text(`iii. Time: ${incident.time || 'Not Provided'}`, 10, baseY + 10);
      doc.text(`iv. Place: ${incident.place || 'Not Provided'}`, 10, baseY + 15);
      doc.text(`v. Person who caused domestic violence: ${incident.perpetrator || 'Not Provided'}`, 10, baseY + 20);
      doc.text(`vi. Types of violence: ${incident.type || 'Not Provided'}`, 10, baseY + 25);
      doc.text(`vii. Remarks: ${incident.remarks || 'Not Provided'}`, 10, baseY + 30);
      doc.text(`viii. Causing hurt of any kind, please specify: ${incident.hurtDetails || 'Not Provided'}`, 10, baseY + 35);
    });

    // Additional documents and details
    doc.text("List of documents attached:", 10, 250);
    doc.text("1. Medico legal certificate", 10, 260);
    doc.text("2. Doctor’s certificate or any other prescription", 10, 265);
    doc.text("3. List of Stridhan", 10, 270);
    doc.text("4. Any other document", 10, 275);
    doc.text("Place: __________________", 10, 290);
    doc.text(`Date: ${currentDate}`, 10, 295);

    return { doc, fileName }; // Return doc and filename for reuse
  };

  const downloadPDF = () => {
    const { doc, fileName } = generatePDF();
    doc.save(fileName); // Save PDF to user's device
  };

  const sendEmail = (recipientEmail) => {
    const { doc, fileName } = generatePDF();

    // Convert PDF to a Blob
    const pdfBlob = doc.output('blob');

    // Create a form data object
    const formData = new FormData();
    formData.append('file', pdfBlob, fileName);
    formData.append('email', recipientEmail);

    // Use fetch to send the PDF to your email sending API
    fetch('YOUR_EMAIL_API_ENDPOINT', { // Replace with your actual endpoint
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(`PDF sent successfully to ${recipientEmail}!`);
        } else {
          alert(`Failed to send PDF to ${recipientEmail}.`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error sending PDF.');
      });
  };

  if (!formData) {
    return <p>No case details available. Please submit the form first.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Domestic Incident Report</h1>
        <div className="mb-6">
          <p><strong>Submitted On:</strong> {currentDate}</p>
          <p><strong>Case Title:</strong> {formData.caseTitle}</p>
          <p><strong>Client:</strong> {formData.clientName}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Date:</strong> {formData.caseDate}</p>
          <p><strong>Type:</strong> {formData.caseType}</p>
        </div>

        {/* Email input field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter email to send PDF"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Send Email button */}
        <button
          onClick={() => sendEmail(email)}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 mb-4"
        >
          Send PDF via Email
        </button>

        {/* Download PDF button */}
        <button
          onClick={downloadPDF}
          className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 mb-4"
        >
          Download PDF
        </button>

        {/* Submit button for default email */}
        <button
          onClick={() => sendEmail('example@gmail.com')}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DomesticIncidentReport;
