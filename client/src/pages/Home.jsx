import React from 'react';
import Card from './Card'; // Assuming Card component is in the same directory
import CaseHistory from './caseHistory';

function Home() {
  return (
    <>
   
    <div className="container mx-auto py-10 space-y-8 bg-white">
      {/* Title and Image for Legal Support */}
      <h1 className="text-3xl font-bold text-center my-8">
        Find the Right Legal Support
      </h1>
      <img
        src="https://d12aarmt01l54a.cloudfront.net/cms/images/UserMedia-20240403163948/808-440.png" // Replace with your image URL
        alt="Legal Support"
        className="mx-auto h-[600px] w-auto"
      />

      <Card
        imageUrl="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        title="Incident Reporting"
        subheading="Report Incidents Anonymously or with Details"
        description="Reporting a domestic abuse incident can be difficult, but with our user-friendly portal,
          you can do so anonymously or with your details. Based on the information you provide,
          we recommend a list of specialized lawyers to assist you, giving you the support you
          need when it matters most."
        link="/formone"
        bgColor="bg-blue-300" // Soft blue background
      />

      <Card
        imageUrl="https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        title="Appointment Booking"
        subheading="Book Appointments with Ease"
        description="Schedule appointments with your chosen lawyer directly from the platform. Our
          appointment booking system integrates with your calendar, ensuring you receive timely
          consultations at your convenience."
        link="/userdata"
        bgColor="bg-purple-300" // Soft purple background
      />

      <Card
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        title="Lawyer Directory"
        subheading="Access a Comprehensive Directory of Trusted Lawyers in Solapur"
        description="Whether you're looking for a lawyer with years of experience or a specialist in domestic
          violence cases, our directory offers detailed lawyer profiles. Each lawyer is categorized
          by their expertise, experience, and fees, so you can make informed decisions."
        link="/lawyer-directory"
        bgColor="bg-gray-300" // Soft grey background
      />
    </div>
    </>
  );
}

export default Home;
