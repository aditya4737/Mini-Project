import React, { useState, createContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';

const FormOne = () => {
    const { login } = useAuth();
    useEffect(() => {
       
        const pass = localStorage.getItem('pass');
        const email = localStorage.getItem('email');
        login(pass, email, "1");
        
      }, []);
    const [formData, setFormData] = useState({
        complainantName: "",
        complainantContact: "",
        incidents: [],
        violenceType: [
            { id: "physical", label: "Physical", checked: false },
            { id: "sexual", label: "Sexual", checked: false },
            { id: "emotional", label: "Emotional", checked: false },
            { id: "economic", label: "Economic", checked: false },
            { id: "dowry", label: "Dowry Related", checked: false },
        ],
    });
  
    const [respondentDetails, setRespondentDetails] = useState([{ name: "", age: "", sex: "", relation: "" }]);
    const [childrenDetails, setChildrenDetails] = useState([{ name: "", age: "", sex: "", residingWith: "" }]);
  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRespondentChange = (index, e) => {
        const newRespondents = [...respondentDetails];
        newRespondents[index][e.target.name] = e.target.value;
        setRespondentDetails(newRespondents);
    };

    const handleChildrenChange = (index, e) => {
        const newChildren = [...childrenDetails];
        newChildren[index][e.target.name] = e.target.value;
        setChildrenDetails(newChildren);
    };

    const handleAddRespondent = () => {
        setRespondentDetails([...respondentDetails, { name: "", age: "", sex: "", relation: "" }]);
    };

    const handleRemoveRespondent = (index) => {
        const newRespondents = respondentDetails.filter((_, i) => i !== index);
        setRespondentDetails(newRespondents);
    };

    const handleAddChild = () => {
        setChildrenDetails([...childrenDetails, { name: "", age: "", sex: "", residingWith: "" }]);
    };

    const handleRemoveChild = (index) => {
        const newChildren = childrenDetails.filter((_, i) => i !== index);
        setChildrenDetails(newChildren);
    };

    const handleIncidentChange = (index, e) => {
        const newIncidents = [...formData.incidents];
        newIncidents[index][e.target.name] = e.target.value;
        setFormData({ ...formData, incidents: newIncidents });
    };

    const handleAddIncident = () => {
        setFormData({ ...formData, incidents: [...formData.incidents, { date: "", time: "", place: "", person: "" }] });
    };

    const handleRemoveIncident = (index) => {
        const newIncidents = formData.incidents.filter((_, i) => i !== index);
        setFormData({ ...formData, incidents: newIncidents });
    };

    const handleTypeOfViolenceChange = (index) => {
        const newViolenceType = [...formData.violenceType];
        newViolenceType[index].checked = !newViolenceType[index].checked;
        setFormData({ ...formData, violenceType: newViolenceType });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            const token = localStorage.getItem('authToken');
            
            if (!token) {
              throw new Error("No token found. Please login again.");
            }
            
          
          
            const response = await axios.post(
              'http://localhost:3300/api/formone',
              formData, 
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                }
              }
            );
        
            
            console.log('Form submitted successfully:', response.data);
            navigate("/formtwo");
          } catch (err) {
            console.error(err.response ? err.response.data : err.message);
          }
      };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem('authToken');
    //         const email1 = localStorage.getItem('email');
    // console.log(token , email1);
    
         
    //         if (!token) {
    //             throw new Error("No token found. Please login again.");
    //         }
    
    //         // Ensure the formData contains the proper structure
    //         const dataToSend = {
    //             complainantName: formData.complainantName,
    //             complainantContact: formData.complainantContact,
    //             respondentDetails: respondentDetails,
    //             childrenDetails: childrenDetails,
    //             incidents: formData.incidents,
    //             // If applicable, include any other fields you want to send
    //             sexualViolence: {}, // Example: empty map if not used
    //             otherSexualAbuse: [], // Example: empty array if not used
    //             verbalEmotionalAbuse: {}, // Example: empty map if not used
    //             otherVerbalAbuse: [], // Example: empty array if not used
    //             economicViolence: {}, // Example: empty map if not used
    //             otherEconomicViolence: [], // Example: empty array if not used
    //             additionalInfo: "", // Example: empty string if not used
    //         };
    
    //         const response = await axios.post(
    //             'http://localhost:3300/api/formone',
    //             dataToSend,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             }
    //         );
    
    //         console.log('Form submitted successfully:', response.data);
    //         navigate("/formtwo");
    //     } catch (err) {
    //         console.error(err.response ? err.response.data : err.message);
    //     }
    // };
    
    

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h1 className="text-3xl font-bold mb-6">Domestic Incident Report</h1>
            <form onSubmit={handleSubmit}>
                {/* Complainant/Aggrieved Person Details */}
                <h2 className="text-2xl font-semibold mb-4">Details of the Complainant / Aggrieved Person</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="complainantName">
                        Name
                    </label>
                    <input
                        type="text"
                        id="complainantName"
                        name="complainantName"
                        value={formData.complainantName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="complainantContact">
                        Contact Information
                    </label>
                    <input
                        type="text"
                        id="complainantContact"
                        name="complainantContact"
                        value={formData.complainantContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div>
                    {/* Respondent Details */}
                    <h2 className="text-2xl font-semibold mb-4">Respondent Details</h2>
                    {respondentDetails.map((respondent, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Respondent {index + 1}</h3>

                            {/* Respondent Name Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`respondentName-${index}`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id={`respondentName-${index}`}
                                    name="name"
                                    value={respondent.name}
                                    onChange={(e) => handleRespondentChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Age and Sex Fields */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label htmlFor={`respondentAge-${index}`} className="text-sm font-medium">Age</label>
                                    <input
                                        type="text"
                                        id={`respondentAge-${index}`}
                                        name="age"
                                        value={respondent.age}
                                        onChange={(e) => handleRespondentChange(index, e)}
                                        className="p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor={`respondentSex-${index}`} className="text-sm font-medium">Sex</label>
                                    <select
                                        id={`respondentSex-${index}`}
                                        name="sex"
                                        value={respondent.sex}
                                        onChange={(e) => handleRespondentChange(index, e)}
                                        className="p-2 border border-gray-300 rounded"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            {/* Relation to Complainant Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`respondentRelation-${index}`}>
                                    Relation to Complainant
                                </label>
                                <input
                                    type="text"
                                    id={`respondentRelation-${index}`}
                                    name="relation"
                                    value={respondent.relation}
                                    onChange={(e) => handleRespondentChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Remove Respondent Button */}
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRespondent(index)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove Respondent
                                </button>
                            )}
                        </div>
                    ))}
                    {/* Add Respondent Button */}
                    <button
                        type="button"
                        onClick={handleAddRespondent}
                        className="text-blue-500 hover:underline mb-6"
                    >
                        Add Respondent
                    </button>
                </div>

                <div>
                    {/* Children Details */}
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Children Details (if any)</h2>
                    {childrenDetails.map((child, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Child {index + 1}</h3>

                            {/* Child Name Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`childName-${index}`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id={`childName-${index}`}
                                    name="name"
                                    value={child.name}
                                    onChange={(e) => handleChildrenChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    
                                />
                            </div>
                            {/* Age and Sex Fields */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col">
                                    <label htmlFor={`childAge-${index}`} className="text-sm font-medium">Age</label>
                                    <input
                                        type="text"
                                        id={`childAge-${index}`}
                                        name="age"
                                        value={child.age}
                                        onChange={(e) => handleChildrenChange(index, e)}
                                        className="p-2 border border-gray-300 rounded"
                                        
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor={`childSex-${index}`} className="text-sm font-medium">Sex</label>
                                    <select
                                        id={`childSex-${index}`}
                                        name="sex"
                                        value={child.sex}
                                        onChange={(e) => handleChildrenChange(index, e)}
                                        className="p-2 border border-gray-300 rounded"
                                        
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            {/* Residing With Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`childResidingWith-${index}`}>
                                    Residing With
                                </label>
                                <input
                                    type="text"
                                    id={`childResidingWith-${index}`}
                                    name="residingWith"
                                    value={child.residingWith}
                                    onChange={(e) => handleChildrenChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    
                                />
                            </div>
                            {/* Remove Child Button */}
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveChild(index)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove Child
                                </button>
                            )}
                        </div>
                    ))}
                    {/* Add Child Button */}
                    <button
                        type="button"
                        onClick={handleAddChild}
                        className="text-blue-500 hover:underline mb-6"
                    >
                        Add Child
                    </button>
                </div>

                <div>
                    {/* Incidents of Domestic Violence */}
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Incidents of Domestic Violence</h2>
                    {formData.incidents.map((incident, index) => (
                        <div key={index} className="mb-6 border p-4 rounded shadow">
                            <h3 className="text-xl font-semibold mb-2">Incident {index + 1}</h3>

                            {/* Date Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`incidentDate-${index}`}>
                                    Date
                                </label>
                                <input
                                    type="date"
                                    id={`incidentDate-${index}`}
                                    name="date"
                                    value={incident.date}
                                    onChange={(e) => handleIncidentChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Time Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`incidentTime-${index}`}>
                                    Time
                                </label>
                                <input
                                    type="time"
                                    id={`incidentTime-${index}`}
                                    name="time"
                                    value={incident.time}
                                    onChange={(e) => handleIncidentChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Place Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`incidentPlace-${index}`}>
                                    Place
                                </label>
                                <input
                                    type="text"
                                    id={`incidentPlace-${index}`}
                                    name="place"
                                    value={incident.place}
                                    onChange={(e) => handleIncidentChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Person Involved Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor={`incidentPerson-${index}`}>
                                    Person Involved
                                </label>
                                <input
                                    type="text"
                                    id={`incidentPerson-${index}`}
                                    name="person"
                                    value={incident.person}
                                    onChange={(e) => handleIncidentChange(index, e)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            {/* Remove Incident Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveIncident(index)}
                                className="text-red-500 hover:underline"
                            >
                                Remove Incident
                            </button>
                        </div>
                    ))}
                    {/* Add Incident Button */}
                    <button
                        type="button"
                        onClick={handleAddIncident}
                        className="text-blue-500 hover:underline mb-6"
                    >
                        Add Incident
                    </button>
                </div>


                {/* Types of Violence */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Violence</h2>
                <div className="mb-4">
                    {formData.violenceType.map((violence, index) => (
                        <div key={violence.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={violence.id}
                                checked={violence.checked}
                                onChange={() => handleTypeOfViolenceChange(index)}
                                className="mr-2"
                            />
                            <label htmlFor={violence.id} className="text-sm">{violence.label}</label>
                        </div>
                    ))}
                </div>

                {/* Additional Information or Assistance Needed */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Additional Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="additionalInfo">
                        Please provide any additional information
                    </label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded"
                        rows="4"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white py-3 rounded shadow hover:bg-blue-600"
                    >
                        save
                    </button>
                    
                </div>

            </form>
        </div>
    );
};

export default FormOne;
