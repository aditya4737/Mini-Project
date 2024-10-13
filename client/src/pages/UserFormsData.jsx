


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserFormsData = () => {
//   const [formOneData, setFormOneData] = useState(null);
//   const [formTwoData, setFormTwoData] = useState(null);
//   const [formThreeData, setFormThreeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('authToken'); // Get token from local storage
//         if (!token) {
//           throw new Error('No token found. User must be logged in.');
//         }

//         const headers = { Authorization: `Bearer ${token}` };

//         const formOneResponse = await axios.get('/api/formone', { headers });
//         const formTwoResponse = await axios.get('/api/formtwo', { headers });
//         const formThreeResponse = await axios.get('/api/formthree', { headers });

//         setFormOneData(formOneResponse.data);
//         setFormTwoData(formTwoResponse.data);
//         setFormThreeData(formThreeResponse.data);
//       } catch (err) {
//         console.error('Error fetching forms data:', err.response ? err.response.data : err.message);
//         setError('Error fetching forms data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Forms Data</h1>

//       {/* Display Form One */}
//       <h2 className="text-xl font-semibold mb-2">Form One Data (Domestic Incident Report)</h2>
//       <div className="bg-gray-100 p-4 rounded mb-4">
//         {formOneData ? (
//           <>
//             <p><strong>Complainant Name:</strong> {formOneData.complainantName}</p>
//             <p><strong>Complainant Contact:</strong> {formOneData.complainantContact}</p>

//            <h3 className="font-semibold mt-4">Respondent Details</h3>
//              {formOneData.respondentDetails.map((respondent, index) => (
//               <div key={index} className="mb-2">
//                 <p><strong>Name:</strong> {respondent.name}</p>
//                 <p><strong>Age:</strong> {respondent.age}</p>
//                 <p><strong>Sex:</strong> {respondent.sex}</p>
//                 <p><strong>Relation:</strong> {respondent.relation}</p>
//               </div>
//             ))}

//             <h3 className="font-semibold mt-4">Children Details</h3>
//             {formOneData.childrenDetails.map((child, index) => (
//               <div key={index} className="mb-2">
//                 <p><strong>Name:</strong> {child.name}</p>
//                 <p><strong>Age:</strong> {child.age}</p>
//                 <p><strong>Sex:</strong> {child.sex}</p>
//                 <p><strong>Residing With:</strong> {child.residingWith}</p>
//               </div>
//             ))}

//             <h3 className="font-semibold mt-4">Incidents</h3>
//             {formOneData.incidents.map((incident, index) => (
//               <div key={index} className="mb-2">
//                 <p><strong>Date:</strong> {new Date(incident.date).toLocaleDateString()}</p>
//                 <p><strong>Time:</strong> {incident.time}</p>
//                 <p><strong>Place:</strong> {incident.place}</p>
//                 <p><strong>Person Involved:</strong> {incident.personInvolved}</p>
//               </div>
//              ))}

//             <h3 className="font-semibold mt-4">Additional Info</h3>
//             <p>{formOneData.additionalInfo}</p>
//          </>
//         ) : (
//           <p>No data available for Form One</p>
//         )}
//       </div>

//       {/* Display Form Two */}
//       <h2 className="text-xl font-semibold mb-2">Form Two Data</h2>
//       <div className="bg-gray-100 p-4 rounded mb-4">
//         {formTwoData ? (
//           <>
//             <h3 className="font-semibold">Sexual Violence</h3>
//             <p>Forced Intercourse: {formTwoData.sexualViolence.forcedIntercourse ? 'Yes' : 'No'}</p>
//             <p>Forced Pornography: {formTwoData.sexualViolence.forcedPornography ? 'Yes' : 'No'}</p>

//             <h3 className="font-semibold mt-4">Verbal Emotional Abuse</h3>
//             <p>Accusation: {formTwoData.verbalEmotionalAbuse.accusation ? 'Yes' : 'No'}</p>
//             <p>Insult Dowry: {formTwoData.verbalEmotionalAbuse.insultDowry ? 'Yes' : 'No'}</p>

//             {/* Continue mapping other fields as per the schema */}
//           </>
//         ) : (
//           <p>No data available for Form Two</p>
//         )}
//       </div>

//       {/* Display Form Three */}
//       <h2 className="text-xl font-semibold mb-2">Form Three Data</h2>
//       <div className="bg-gray-100 p-4 rounded mb-4">
//         {formThreeData ? (
//           <>
//             <h3 className="font-semibold">Dowry Demands</h3>
//             {formThreeData.dowryDemands.map((demand, index) => (
//               <div key={index}>
//                 <p>{demand.value}</p>
//               </div>
//             ))}

//             <h3 className="font-semibold mt-4">Protection Order</h3>
//             <p>{formThreeData.protectionOrder}</p>

//             <h3 className="font-semibold mt-4">Attached Documents</h3>
//             {formThreeData.attachedDocuments.map((doc, index) => (
//               <div key={index}>
//                 <p><strong>{doc.label}:</strong> {doc.name}</p>
//               </div>
//             ))}
//           </>
//         ) : (
//           <p>No data available for Form Three</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserFormsData;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFormsData = () => {
  const [formOneData, setFormOneData] = useState({});
  const [formTwoData, setFormTwoData] = useState({});
  const [formThreeData, setFormThreeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found. User must be logged in.');
        }

        const headers = { Authorization: `Bearer ${token}` };

        const formOneResponse = await axios.get('http://localhost:3300/api/data/formone', { headers });
        const formTwoResponse = await axios.get('http://localhost:3300/api/data/formtwo', { headers });
        const formThreeResponse = await axios.get('http://localhost:3300/api/data/formthree', { headers });
        
        
        console.log('Form One Response:', formOneResponse.data);
        console.log('Form Two Response:', formTwoResponse.data);
        console.log('Form Three Response:', formThreeResponse.data);

        
        setFormOneData(formOneResponse.data);
        setFormTwoData(formTwoResponse.data);
        setFormThreeData(formThreeResponse.data);
      } catch (err) {
        console.error('Error fetching forms data:', err.response ? err.response.data : err.message);
        setError('Error fetching forms data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Forms Data</h1>

      {/* Display Form One */}
      {formOneData && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Form One Data (Domestic Incident Report)</h2>
          <p><strong>Complainant Name:</strong> {formOneData.complainantName || 'N/A'}</p>
          <p><strong>Complainant Contact:</strong> {formOneData.complainantContact || 'N/A'}</p>

          {formOneData.respondentDetails && formOneData.respondentDetails.length > 0 && (
            <div>
              <h3 className="font-semibold mt-4">Respondent Details</h3>
              {formOneData.respondentDetails.map((respondent, index) => (
                <div key={index} className="mb-2">
                  <p><strong>Name:</strong> {respondent.name || 'N/A'}</p>
                  <p><strong>Age:</strong> {respondent.age || 'N/A'}</p>
                  <p><strong>Sex:</strong> {respondent.sex || 'N/A'}</p>
                  <p><strong>Relation:</strong> {respondent.relation || 'N/A'}</p>
                </div>
              ))}
            </div>
          )}

          {formOneData.childrenDetails && formOneData.childrenDetails.length > 0 && (
            <div>
              <h3 className="font-semibold mt-4">Children Details</h3>
              {formOneData.childrenDetails.map((child, index) => (
                <div key={index} className="mb-2">
                  <p><strong>Name:</strong> {child.name || 'N/A'}</p>
                  <p><strong>Age:</strong> {child.age || 'N/A'}</p>
                  <p><strong>Sex:</strong> {child.sex || 'N/A'}</p>
                  <p><strong>Residing With:</strong> {child.residingWith || 'N/A'}</p>
                </div>
              ))}
            </div>
          )}

          {formOneData.incidents && formOneData.incidents.length > 0 && (
            <div>
              <h3 className="font-semibold mt-4">Incidents</h3>
              {formOneData.incidents.map((incident, index) => (
                <div key={index} className="mb-2">
                  <p><strong>Date:</strong> {incident.date ? new Date(incident.date).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Time:</strong> {incident.time || 'N/A'}</p>
                  <p><strong>Place:</strong> {incident.place || 'N/A'}</p>
                  <p><strong>Person Involved:</strong> {incident.personInvolved || 'N/A'}</p>
                </div>
              ))}
            </div>
          )}

          {formOneData.additionalInfo && (
            <div>
              <h3 className="font-semibold mt-4">Additional Info</h3>
              <p>{formOneData.additionalInfo || 'N/A'}</p>
            </div>
          )}
        </div>
      )}

      {/* Display Form Two */}
      {formTwoData && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Form Two Data</h2>

          {formTwoData.sexualViolence && (
            <div>
              <h3 className="font-semibold">Sexual Violence</h3>
              <p>Forced Intercourse: {formTwoData.sexualViolence.forcedIntercourse ? 'Yes' : 'No'}</p>
              <p>Forced Pornography: {formTwoData.sexualViolence.forcedPornography ? 'Yes' : 'No'}</p>
              <p>Forced Entertainment: {formTwoData.sexualViolence.forcedEntertainment ? 'Yes' : 'No'}</p>

              {formTwoData.sexualViolence.otherSexualAbuse && formTwoData.sexualViolence.otherSexualAbuse.length > 0 && (
                <div>
                  <h4 className="font-semibold">Other Sexual Abuse:</h4>
                  <ul>
                    {formTwoData.sexualViolence.otherSexualAbuse.map((abuse, index) => (
                      <li key={index}>{abuse || 'N/A'}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {formTwoData.verbalEmotionalAbuse && (
            <div>
              <h3 className="font-semibold mt-4">Verbal Emotional Abuse</h3>
              <p>Accusation: {formTwoData.verbalEmotionalAbuse.accusation ? 'Yes' : 'No'}</p>
              <p>Insult Dowry: {formTwoData.verbalEmotionalAbuse.insultDowry ? 'Yes' : 'No'}</p>
              <p>Insult No Male Child: {formTwoData.verbalEmotionalAbuse.insultNoMaleChild ? 'Yes' : 'No'}</p>
              <p>Insult No Child: {formTwoData.verbalEmotionalAbuse.insultNoChild ? 'Yes' : 'No'}</p>
              <p>Demeaning Remarks: {formTwoData.verbalEmotionalAbuse.demeaningRemarks ? 'Yes' : 'No'}</p>
              <p>Ridicule: {formTwoData.verbalEmotionalAbuse.ridicule ? 'Yes' : 'No'}</p>
              <p>Name Calling: {formTwoData.verbalEmotionalAbuse.nameCalling ? 'Yes' : 'No'}</p>
              <p>Forcing Not Attend School: {formTwoData.verbalEmotionalAbuse.forcingNotAttendSchool ? 'Yes' : 'No'}</p>
              <p>Preventing Job: {formTwoData.verbalEmotionalAbuse.preventingJob ? 'Yes' : 'No'}</p>
              <p>Preventing Leaving House: {formTwoData.verbalEmotionalAbuse.preventingLeavingHouse ? 'Yes' : 'No'}</p>
              <p>Preventing Meeting Person: {formTwoData.verbalEmotionalAbuse.preventingMeetingPerson ? 'Yes' : 'No'}</p>
              <p>Forced Marriage: {formTwoData.verbalEmotionalAbuse.forcedMarriage ? 'Yes' : 'No'}</p>
              <p>Preventing Marriage Of Choice: {formTwoData.verbalEmotionalAbuse.preventingMarriageOfChoice ? 'Yes' : 'No'}</p>
              <p>Forced Marriage Against Will: {formTwoData.verbalEmotionalAbuse.forcedMarriageAgainstWill ? 'Yes' : 'No'}</p>

              {formTwoData.verbalEmotionalAbuse.otherVerbalAbuse && formTwoData.verbalEmotionalAbuse.otherVerbalAbuse.length > 0 && (
                <div>
                  <h4 className="font-semibold">Other Verbal Abuse:</h4>
                  <ul>
                    {formTwoData.verbalEmotionalAbuse.otherVerbalAbuse.map((abuse, index) => (
                      <li key={index}>{abuse || 'N/A'}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {formTwoData.economicViolence && (
            <div>
              <h3 className="font-semibold mt-4">Economic Violence</h3>
              <p>No Money For Children: {formTwoData.economicViolence.noMoneyForChildren ? 'Yes' : 'No'}</p>
              <p>No Food/Clothes/Medicine: {formTwoData.economicViolence.noFoodClothesMedicine ? 'Yes' : 'No'}</p>
              <p>Forced Out Of House: {formTwoData.economicViolence.forcedOutOfHouse ? 'Yes' : 'No'}</p>
              <p>Prevent Access House: {formTwoData.economicViolence.preventAccessHouse ? 'Yes' : 'No'}</p>
              <p>Prevent Employment: {formTwoData.economicViolence.preventEmployment ? 'Yes' : 'No'}</p>
              <p>No Employment: {formTwoData.economicViolence.noEmployment ? 'Yes' : 'No'}</p>
              <p>Non-Payment Rent: {formTwoData.economicViolence.nonPaymentRent ? 'Yes' : 'No'}</p>
              <p>No Use Household Items: {formTwoData.economicViolence.noUseHouseholdItems ? 'Yes' : 'No'}</p>
              <p>Selling Stridhan: {formTwoData.economicViolence.sellingStridhan ? 'Yes' : 'No'}</p>
              <p>Taking Salary: {formTwoData.economicViolence.takingSalary ? 'Yes' : 'No'}</p>
              <p>Disposing Stridhan: {formTwoData.economicViolence.disposingStridhan ? 'Yes' : 'No'}</p>
              <p>Non-Payment Bills: {formTwoData.economicViolence.nonPaymentBills ? 'Yes' : 'No'}</p>

              {formTwoData.economicViolence.otherEconomicViolence && formTwoData.economicViolence.otherEconomicViolence.length > 0 && (
                <div>
                  <h4 className="font-semibold">Other Economic Violence:</h4>
                  <ul>
                    {formTwoData.economicViolence.otherEconomicViolence.map((violence, index) => (
                      <li key={index}>{violence || 'N/A'}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {formTwoData.additionalInformation && (
            <div>
              <h3 className="font-semibold mt-4">Additional Information</h3>
              {formTwoData.additionalInformation.otherAdditionalInfo && formTwoData.additionalInformation.otherAdditionalInfo.length > 0 ? (
                <ul>
                  {formTwoData.additionalInformation.otherAdditionalInfo.map((info, index) => (
                    <li key={index}>{info || 'N/A'}</li>
                  ))}
                </ul>
              ) : (
                <p>N/A</p>
              )}
            </div>
          )}
        </div>
      )}

    {/* Display Form Three */}
{formThreeData && (
  <div className="bg-gray-100 p-4 rounded mb-4">
    <h2 className="text-xl font-semibold mb-2">Form Three Data</h2>
    <p>
      <strong>Dowry Related Harassment:</strong> 
      {formThreeData.dowryRelatedHarassment ? 
        (formThreeData.dowryRelatedHarassment.otherDowryDetails || 'N/A') 
        : 'N/A'}
    </p>
    <p><strong>Protection Order:</strong> {formThreeData.protectionOrder || 'N/A'}</p>

    {formThreeData.legalOrders && formThreeData.legalOrders.length > 0 && (
      <div>
        <h3 className="font-semibold mt-4">Legal Orders</h3>
        <ul>
          {formThreeData.legalOrders.map((order, index) => (
            <li key={index}>{order || 'N/A'}</li>
          ))}
        </ul>
      </div>
    )}

    {formThreeData.attachedDocuments && formThreeData.attachedDocuments.length > 0 && (
      <div>
        <h3 className="font-semibold mt-4">Attached Documents</h3>
        <ul>
          {formThreeData.attachedDocuments.map((doc, index) => (
            <li key={index}>{doc || 'N/A'}</li>
          ))}
        </ul>
      </div>
    )}

    {formThreeData.assistanceOptions && formThreeData.assistanceOptions.length > 0 && (
      <div>
        <h3 className="font-semibold mt-4">Assistance Options</h3>
        <ul>
          {formThreeData.assistanceOptions.map((option, index) => (
            <li key={index}>{option || 'N/A'}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default UserFormsData;
