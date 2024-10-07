import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { pdfjs, Document, Page } from "react-pdf"; // For rendering PDFs
import { saveAs } from "file-saver"; // For downloading files

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CaseEinvoice = () => {
  const location = useLocation();
  // Provide fallback in case location.state is undefined
  const { formData } = location.state || {};

  console.log(formData);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle PDF download
  const handleDownload = () => {
    if (!formData) {
      alert("No PDF data available.");
      return;
    }

    const blob = new Blob([formData], { type: "application/pdf" });
    saveAs(blob, "Case_Einvoice.pdf");
  };

  // Handle sending email
  const handleSendEmail = async (e) => {
    e && e.preventDefault(); // Make sure `e` exists before calling preventDefault
    setLoading(true);
    const emailToSend = email || "example@gmail.com";

    try {
      // Simulate email sending
      alert(`PDF sent to ${emailToSend} successfully!`);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Case Einvoice</h2>

      <div className="border border-gray-300 p-4 mb-8">
        {formData ? (
          <Document file={{ data: formData }}>
            <Page pageNumber={1} />
          </Document>
        ) : (
          <p>No PDF data to display.</p>
        )}
      </div>

      <form className="mb-4" onSubmit={handleSendEmail}>
        <label htmlFor="email" className="block mb-2 font-semibold">
          Send PDF to Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </button>
      </form>

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4"
      >
        Download PDF
      </button>

      <button
        onClick={() => {
          setEmail("example@gmail.com");
          handleSendEmail(); // Remove event from this call
        }}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Submit (Send to default email: example@gmail.com)
      </button>
    </div>
  );
};

export default CaseEinvoice;
