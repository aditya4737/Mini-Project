import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Use useNavigate in v6


const CaseForm = () => {
  const navigate = useNavigate();  // Hook for programmatic navigation

  // State initialization for respondent and children details
  const [respondentDetails, setRespondentDetails] = useState([
    { name: "", age: "", sex: "", relation: "" },
  ]);
  const [childrenDetails, setChildrenDetails] = useState([
    { name: "", age: "", sex: "", residingWith: "" },
  ]);

  // Main form data state
  const [formData, setFormData] = useState({
    complainantName: "",
    complainantAge: "",
    respondentName: "",
    respondentAge: "",
    children: [{ name: "", age: "", sex: "", residingWith: "" }],
    incidentDate: "",
    incidentTime: "",
    incidentPlace: "",
    incidentPerson: "",

    protectionOrder: "",
    residenceOrder: "",
    maintenanceOrder: "",
    custodyOrder: "",
    compensationOrder: "",
    anyOtherOrder: "",
    otherOrderDetails: "",
    counsellor: "",
    counsellorDetails: "",
    policeAssistance: "",
    policeAssistanceDetails: "",

    violenceType: {
      physicalViolence: false,
      sexualViolence: false,
      emotionalViolence: false,
      economicViolence: false,
      dowryViolence: false,
    },
    legalOrder: "",
    orderDetails: "",
    sexualViolence: {
      forcedIntercourse: false,
      forcedPornography: false,
      forcedEntertainment: false,
      otherSexualAbuse: "",
    },
    verbalEmotionalAbuse: {
      accusation: false,
      insultDowry: false,
      insultNoMaleChild: false,
      insultNoChild: false,
      demeaningRemarks: false,
      ridicule: false,
      nameCalling: false,
      forcingNotAttendSchool: false,
      preventingJob: false,
      preventingLeavingHouse: false,
      preventingMeetingPerson: false,
      forcedMarriage: false,
      preventingMarriageOfChoice: false,
      forcedMarriageAgainstWill: false,
      otherVerbalAbuse: "",
    },
    economicViolence: {
      noMoneyForMaintenance: false,
      noFoodOrClothes: false,
      forcedOutOfHouse: false,
      preventingUseHouse: false,
      obstructingEmployment: false,
      notAllowingEmployment: false,
      noRentPayment: false,
      notAllowingHouseholdUse: false,
      sellingValuables: false,
      forciblyTakingSalary: false,
      disposingStridhan: false,
      noPaymentBills: false,
      otherEconomicViolence: "",
    },
    dowryRelatedHarassment: {
      dowryDemand: "",
      otherDowryDetails: "",
      dowryItemsAttached: false,
    },
    otherDomesticViolenceInfo: "",
    attachedDocuments: {
      medicoLegalCertificate: false,
      doctorCertificate: false,
      stridhanList: false,
      otherDocument: false,
    },
  });

  // Handlers for respondent and children details changes
  const handleRespondentChange = (index, e) => {
    const newDetails = [...respondentDetails];
    newDetails[index][e.target.name] = e.target.value;
    setRespondentDetails(newDetails);
  };

  const handleChildrenChange = (index, e) => {
    const newDetails = [...childrenDetails];
    newDetails[index][e.target.name] = e.target.value;
    setChildrenDetails(newDetails);
  };

  // Handlers for adding/removing respondents and children
  const handleAddRespondent = () => {
    setRespondentDetails([
      ...respondentDetails,
      { name: "", age: "", sex: "", relation: "" },
    ]);
  };

  const handleAddChild = () => {
    setChildrenDetails([
      ...childrenDetails,
      { name: "", age: "", sex: "", residingWith: "" },
    ]);
  };

  const handleRemoveRespondent = (index) => {
    const newDetails = [...respondentDetails];
    newDetails.splice(index, 1);
    setRespondentDetails(newDetails);
  };

  const handleRemoveChild = (index) => {
    const newDetails = [...childrenDetails];
    newDetails.splice(index, 1);
    setChildrenDetails(newDetails);
  };

  // Handlers for form field changes
  const handleViolenceTypeChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      violenceType: { ...formData.violenceType, [name]: checked },
    });
  };

  const handleSexualViolenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      sexualViolence: {
        ...formData.sexualViolence,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleVerbalEmotionalAbuseChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      verbalEmotionalAbuse: {
        ...formData.verbalEmotionalAbuse,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleEconomicViolenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      economicViolence: {
        ...formData.economicViolence,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleDowryHarassmentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      dowryRelatedHarassment: {
        ...formData.dowryRelatedHarassment,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleDocumentsChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      attachedDocuments: { ...formData.attachedDocuments, [name]: checked },
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files.length > 1 ? Array.from(files) : files[0],
    }));
  };

  // Handlers for additional order details
  const [otherOrders, setOtherOrders] = useState([]);
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  const handleAddOtherOrder = () => {
    if (formData.otherOrderDetails.trim() !== "") {
      setOtherOrders((prevOrders) => [
        ...prevOrders,
        formData.otherOrderDetails,
      ]);
      setFormData((prevData) => ({
        ...prevData,
        otherOrderDetails: "", // Clear the input after adding
      }));
    }
  };

  const handleRemoveOtherOrder = (index) => {
    const updatedOrders = [...otherOrders];
    updatedOrders.splice(index, 1); // Remove the order at the given index
    setOtherOrders(updatedOrders); // Update the state with the new array
  };

  // Handlers for additional order details
  const [additionalOrders, setAdditionalOrders] = useState([]);

  const handleAddAdditionalOrder = () => {
    if (formData.additionalOrderDetails.trim() !== "") {
      setAdditionalOrders((prevOrders) => [
        ...prevOrders,
        formData.additionalOrderDetails,
      ]);
      setFormData((prevData) => ({
        ...prevData,
        additionalOrderDetails: "", // Clear input after adding
      }));
    }
  };

  const handleRemoveAdditionalOrder = (index) => {
    setAdditionalOrders((prevOrders) => {
      const newOrders = [...prevOrders];
      newOrders.splice(index, 1); // Remove order at the specified index
      return newOrders;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value, // Update the specific form field
    }));
};


  // Handler for input field changes
  const handleChange = (e) => {
    const { name, type, checked } = e.target;

    // Check if the input type is a checkbox
    if (type === "checkbox") {
        setFormData((prev) => ({
            ...prev,
            violenceType: {
                ...prev.violenceType,
                [name]: checked,  // Update only the specific violence type
            },
        }));
    } else {
        // For other types (like text or radio), update directly
        setFormData((prev) => ({
            ...prev,
            [name]: e.target.value,  // Update based on value
        }));
    }
};


  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you're saving formData in the state or local storage
    navigate('/caseEinvoice', { state: { formData } });
};



  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">Domestic Incident Report</h1>
      <form>
        {/* Complainant/Aggrieved Person Details */}
        <h2 className="text-2xl font-semibold mb-4">
          Details of the Complainant / Aggrieved Person
        </h2>
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

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Age and Sex Fields */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label htmlFor="age" className="text-sm font-medium">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)} // Handle change
                className="p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sex" className="text-sm font-medium">Sex</label>
              <select
                id="sex"
                name="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)} // Handle change
                className="p-2 w-[150%] border border-gray-300 rounded"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
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
              <div className="flex items-center space-x-4">
                {/* Age Field */}
                <div className="flex flex-col">
                  <label htmlFor={`respondentAge-${index}`} className="text-sm font-medium">Age</label>
                  <input
                    type="text"
                    id={`respondentAge-${index}`}
                    name="age"
                    placeholder="Enter age"
                    value={respondent.age} // Accessing age from respondent object
                    onChange={(e) => handleRespondentChange(index, e)} // Handle change
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Sex Field */}
                <div className="flex flex-col">
                  <label htmlFor={`respondentSex-${index}`} className="text-sm font-medium">Sex</label>
                  <select
                    id={`respondentSex-${index}`}
                    name="sex"
                    value={respondent.sex} // Accessing sex from respondent object
                    onChange={(e) => handleRespondentChange(index, e)} // Handle change
                    className="p-2 w-[150%] border border-gray-300 rounded"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
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
                required
              />
            </div>

            {/* Age and Sex Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-4">
                {/* Age Field */}
                <div className="flex flex-col">
                  <label htmlFor={`childAge-${index}`} className="text-sm font-medium">Age</label>
                  <input
                    type="text"
                    id={`childAge-${index}`}
                    name="age"
                    placeholder="Enter age"
                    value={child.age} // Accessing age from child object
                    onChange={(e) => handleChildrenChange(index, e)} // Handle change
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* Sex Field */}
                <div className="flex flex-col">
                  <label htmlFor={`childSex-${index}`} className="text-sm font-medium">Sex</label>
                  <select
                    id={`childSex-${index}`}
                    name="sex"
                    value={child.sex} // Accessing sex from child object
                    onChange={(e) => handleChildrenChange(index, e)} // Handle change
                    className="p-2 w-[150%] border border-gray-300 rounded"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
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
                required
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


        {/* Incident Details */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Incident Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="incidentDate">
            Date of Incident
          </label>
          <input
            type="date"
            id="incidentDate"
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="incidentTime">
            Time of Incident
          </label>
          <input
            type="time"
            id="incidentTime"
            name="incidentTime"
            value={formData.incidentTime}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="incidentPlace">
            Place of Incident
          </label>
          <input
            type="text"
            id="incidentPlace"
            name="incidentPlace"
            value={formData.incidentPlace}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="incidentPerson">
            Person Present at Incident
          </label>
          <input
            type="text"
            id="incidentPerson"
            name="incidentPerson"
            value={formData.incidentPerson}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* Type of Violence */}
<h2 className="text-2xl font-semibold mt-8 mb-4">Type of Violence</h2>
<div className="mb-4">
  <label className="block text-gray-700 mb-2">Select Types of Violence</label>
  <div className="space-y-2">
    {['physicalViolence', 'sexualViolence', 'emotionalViolence', 'economicViolence', 'dowryViolence'].map((violenceType) => (
      <div key={violenceType}>
        <input
          type="checkbox"
          id={violenceType}
          name={violenceType}
          checked={formData.violenceType[violenceType]} // Dynamic value binding
          onChange={handleChange}
          className="cursor-pointer" // Ensure the pointer cursor is set
        />
        <label htmlFor={violenceType} className="ml-2 cursor-pointer"> {/* Ensure label is clickable */}
          {violenceType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} {/* Format label */}
        </label>
      </div>
    ))}
  </div>
</div>


        {/* Legal Order Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Legal Orders (if any)</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="legalOrder">
            Legal Order Issued
          </label>
          <input
            type="text"
            id="legalOrder"
            name="legalOrder"
            value={formData.legalOrder}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="orderDetails">
            Details of Legal Order
          </label>
          <textarea
            id="orderDetails"
            name="orderDetails"
            value={formData.orderDetails}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* Sexual Violence */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Sexual Violence</h2>
        <div className="mb-4 space-y-2">
          <div>
            <input
              type="checkbox"
              id="forcedIntercourse"
              name="forcedIntercourse"
              checked={formData.sexualViolence.forcedIntercourse}
              onChange={handleSexualViolenceChange}
            />
            <label htmlFor="forcedIntercourse" className="ml-2">
              Forced sexual intercourse
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="forcedPornography"
              name="forcedPornography"
              checked={formData.sexualViolence.forcedPornography}
              onChange={handleSexualViolenceChange}
            />
            <label htmlFor="forcedPornography" className="ml-2">
              Forced to watch pornography or other obscene material
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="forcedEntertainment"
              name="forcedEntertainment"
              checked={formData.sexualViolence.forcedEntertainment}
              onChange={handleSexualViolenceChange}
            />
            <label htmlFor="forcedEntertainment" className="ml-2">
              Forcibly using you to entertain others
            </label>
          </div>
          <div>
            <label className="block text-gray-700 mt-2" htmlFor="otherSexualAbuse">
              Any other act of sexual nature (specify):
            </label>
            <input
              type="text"
              id="otherSexualAbuse"
              name="otherSexualAbuse"
              value={formData.sexualViolence.otherSexualAbuse}
              onChange={handleSexualViolenceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Verbal and Emotional Abuse */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Verbal and Emotional Abuse</h2>
        <div className="mb-4 space-y-2">
          <div>
            <input
              type="checkbox"
              id="accusation"
              name="accusation"
              checked={formData.verbalEmotionalAbuse.accusation}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="accusation" className="ml-2">
              Accusation/aspersion on your character or conduct, etc.
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="insultDowry"
              name="insultDowry"
              checked={formData.verbalEmotionalAbuse.insultDowry}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="insultDowry" className="ml-2">
              Insult for not bringing dowry, etc.
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="insultNoMaleChild"
              name="insultNoMaleChild"
              checked={formData.verbalEmotionalAbuse.insultNoMaleChild}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="insultNoMaleChild" className="ml-2">
              Insult for not having a male child
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="insultNoChild"
              name="insultNoChild"
              checked={formData.verbalEmotionalAbuse.insultNoChild}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="insultNoChild" className="ml-2">
              Insult for not having any child
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="demeaningRemarks"
              name="demeaningRemarks"
              checked={formData.verbalEmotionalAbuse.demeaningRemarks}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="demeaningRemarks" className="ml-2">
              Demeaning, humiliating or undermining remarks/statement
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="ridicule"
              name="ridicule"
              checked={formData.verbalEmotionalAbuse.ridicule}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="ridicule" className="ml-2">
              Ridicule
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="nameCalling"
              name="nameCalling"
              checked={formData.verbalEmotionalAbuse.nameCalling}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="nameCalling" className="ml-2">
              Name calling
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="forcingNotAttendSchool"
              name="forcingNotAttendSchool"
              checked={formData.verbalEmotionalAbuse.forcingNotAttendSchool}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="forcingNotAttendSchool" className="ml-2">
              Forcing you to not attend school, college or any other educational institution
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preventingJob"
              name="preventingJob"
              checked={formData.verbalEmotionalAbuse.preventingJob}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="preventingJob" className="ml-2">
              Preventing you from taking up a job
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preventingLeavingHouse"
              name="preventingLeavingHouse"
              checked={formData.verbalEmotionalAbuse.preventingLeavingHouse}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="preventingLeavingHouse" className="ml-2">
              Preventing you from leaving the House
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preventingMeetingPerson"
              name="preventingMeetingPerson"
              checked={formData.verbalEmotionalAbuse.preventingMeetingPerson}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="preventingMeetingPerson" className="ml-2">
              Preventing you from meeting any particular person
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="forcedMarriage"
              name="forcedMarriage"
              checked={formData.verbalEmotionalAbuse.forcedMarriage}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="forcedMarriage" className="ml-2">
              Forcing you to get married against your will
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preventingMarriageOfChoice"
              name="preventingMarriageOfChoice"
              checked={formData.verbalEmotionalAbuse.preventingMarriageOfChoice}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="preventingMarriageOfChoice" className="ml-2">
              Preventing you from marrying a person of your choice
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="forcedMarriageAgainstWill"
              name="forcedMarriageAgainstWill"
              checked={formData.verbalEmotionalAbuse.forcedMarriageAgainstWill}
              onChange={handleVerbalEmotionalAbuseChange}
            />
            <label htmlFor="forcedMarriageAgainstWill" className="ml-2">
              Forcing you to marry a person of his/their own choice
            </label>
          </div>
          <div>
            <label className="block text-gray-700 mt-2" htmlFor="otherVerbalAbuse">
              Any other verbal or emotional abuse (please specify):
            </label>
            <input
              type="text"
              id="otherVerbalAbuse"
              name="otherVerbalAbuse"
              value={formData.verbalEmotionalAbuse.otherVerbalAbuse}
              onChange={handleVerbalEmotionalAbuseChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />
          </div>
        </div>


        {/* Economic Violence */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Economic Violence</h2>
        <div className="mb-4 space-y-2">
          <div>
            <input
              type="checkbox"
              id="noMoneyForChildren"
              name="noMoneyForChildren"
              checked={formData.economicViolence.noMoneyForChildren}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="noMoneyForChildren" className="ml-2">
              Not providing money for maintaining you or your children
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="noFoodClothesMedicine"
              name="noFoodClothesMedicine"
              checked={formData.economicViolence.noFoodClothesMedicine}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="noFoodClothesMedicine" className="ml-2">
              Not providing food, clothes, medicine, etc., for you or your children
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="forcedOutOfHouse"
              name="forcedOutOfHouse"
              checked={formData.economicViolence.forcedOutOfHouse}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="forcedOutOfHouse" className="ml-2">
              Forcing you out of the house you live in
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preventAccessHouse"
              name="preventAccessHouse"
              checked={formData.economicViolence.preventAccessHouse}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="preventAccessHouse" className="ml-2">
              Preventing you from accessing or using any part of the house
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preventEmployment"
              name="preventEmployment"
              checked={formData.economicViolence.preventEmployment}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="preventEmployment" className="ml-2">
              Preventing or obstructing you from carrying on your employment
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="noEmployment"
              name="noEmployment"
              checked={formData.economicViolence.noEmployment}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="noEmployment" className="ml-2">
              Not allowing you to take up an employment
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="nonPaymentRent"
              name="nonPaymentRent"
              checked={formData.economicViolence.nonPaymentRent}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="nonPaymentRent" className="ml-2">
              Non-payment of rent in case of a rented accommodation
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="noUseHouseholdItems"
              name="noUseHouseholdItems"
              checked={formData.economicViolence.noUseHouseholdItems}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="noUseHouseholdItems" className="ml-2">
              Not allowing you to use clothes or articles of general household use
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="sellingStridhan"
              name="sellingStridhan"
              checked={formData.economicViolence.sellingStridhan}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="sellingStridhan" className="ml-2">
              Selling or pawing your stridhan or any other valuables without informing you and without your consent
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="takingSalary"
              name="takingSalary"
              checked={formData.economicViolence.takingSalary}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="takingSalary" className="ml-2">
              Forcibly taking away your salary, income, or wages etc.
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="disposingStridhan"
              name="disposingStridhan"
              checked={formData.economicViolence.disposingStridhan}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="disposingStridhan" className="ml-2">
              Disposing your stridhan
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="nonPaymentBills"
              name="nonPaymentBills"
              checked={formData.economicViolence.nonPaymentBills}
              onChange={handleEconomicViolenceChange}
            />
            <label htmlFor="nonPaymentBills" className="ml-2">
              Non-payment of other bills such as electricity, etc.
            </label>
          </div>
          <div>
            <label className="block text-gray-700 mt-2" htmlFor="otherEconomicViolence">
              Any other economic violence (please specify):
            </label>
            <input
              type="text"
              id="otherEconomicViolence"
              name="otherEconomicViolence"
              value={formData.economicViolence.otherEconomicViolence}
              onChange={handleEconomicViolenceChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />
          </div>
        </div>


        {/* Dowry Related Harassment */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Dowry Related Harassment</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dowryDemand">
            Demands for dowry made (specify):
          </label>
          <input
            type="text"
            id="dowryDemand"
            name="dowryDemand"
            value={formData.dowryRelatedHarassment.dowryDemand}
            onChange={handleDowryHarassmentChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="otherDowryDetails">
            Any other detail with regard to dowry:
          </label>
          <input
            type="text"
            id="otherDowryDetails"
            name="otherDowryDetails"
            value={formData.dowryRelatedHarassment.otherDowryDetails}
            onChange={handleDowryHarassmentChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* Any Other Information and Document Attachments */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Any Other Information Regarding Acts of Domestic Violence Against You or Your Children
        </h2>
        <div className="mb-4">
          <textarea
            id="otherDomesticViolenceInfo"
            name="otherDomesticViolenceInfo"
            value={formData.otherDomesticViolenceInfo}
            onChange={handleInputChange}
            placeholder="Provide any other relevant information here..."
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">List of Documents Attached</h2>

        {/* Medico Legal Certificate */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="medicoLegalCertificate">
            Medico Legal Certificate:
          </label>
          <input
            type="file"
            id="medicoLegalCertificate"
            name="medicoLegalCertificate"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* Doctor's Certificate */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="doctorsCertificate">
            Doctor’s Certificate or Any Other Prescription:
          </label>
          <input
            type="file"
            id="doctorsCertificate"
            name="doctorsCertificate"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* List of Stridhan */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="listOfStridhan">
            List of Stridhan:
          </label>
          <input
            type="file"
            id="listOfStridhan"
            name="listOfStridhan"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* Any Other Document */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="anyOtherDocument">
            Any Other Document:
          </label>
          <input
            type="file"
            id="anyOtherDocument"
            name="anyOtherDocument"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded"
          />
        </div>

        {/* Orders Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Orders that You Need under the Protection of Women from Domestic Violence Act, 2005
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">S. No.</th>
              <th className="border border-gray-300 px-4 py-2">Orders</th>
              <th className="border border-gray-300 px-4 py-2">Yes/No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">Protection order under section 18</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="protectionOrderYes"
                  name="protectionOrder"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.protectionOrder === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="protectionOrderNo"
                  name="protectionOrder"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.protectionOrder === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>

          </tbody>
        </table>

        {/* Other Orders Section */}
        {otherOrders.length > 0 && (
          <div className="mt-4">
            <h4 className="text-xl font-semibold mb-4">Other Orders</h4>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">S. No.</th>
                  <th className="border border-gray-300 px-4 py-2">Order Details</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {otherOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{order}</td>
                    <td className="border border-gray-300 px-4 py-2">Yes</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        type="button"
                        onClick={() => handleRemoveOtherOrder(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* Add Other/Additional Order Section */}
        <h4 className="text-xl font-semibold mb-4">
          Add Additional Order
        </h4>
        <div className="flex items-center space-x-4 mb-8">
          <input
            type="text"
            name="otherOrderDetails"
            value={formData.otherOrderDetails}
            onChange={handleChange}
            placeholder="Enter other/Additional order details"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full"
          />
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission or page refresh
              handleAddOtherOrder(); // Call the function to add the order
            }}
            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
          >
            Add Order
          </button>
        </div>

        {/* Assistance Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Assistance that You Need</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">S. No.</th>
              <th className="border border-gray-300 px-4 py-2">Assistance Available</th>
              <th className="border border-gray-300 px-4 py-2">Yes/No</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">Counsellor</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="counsellorYes"
                  name="counsellor"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.counsellor === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="counsellorNo"
                  name="counsellor"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.counsellor === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>

            {/* Police Assistance Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">Police Assistance</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="policeAssistanceYes"
                  name="policeAssistance"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.policeAssistance === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="policeAssistanceNo"
                  name="policeAssistance"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.policeAssistance === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>

            {/* Assistance for Initiating Criminal Proceedings Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">3</td>
              <td className="border border-gray-300 px-4 py-2">Assistance for Initiating Criminal Proceedings</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="criminalProceedingsYes"
                  name="criminalProceedings"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.criminalProceedings === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="criminalProceedingsNo"
                  name="criminalProceedings"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.criminalProceedings === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>

            {/* Shelter Home Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">4</td>
              <td className="border border-gray-300 px-4 py-2">Shelter Home</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="shelterHomeYes"
                  name="shelterHome"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.shelterHome === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="shelterHomeNo"
                  name="shelterHome"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.shelterHome === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>

            {/* Medical Facilities Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">5</td>
              <td className="border border-gray-300 px-4 py-2">Medical Facilities</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="medicalFacilitiesYes"
                  name="medicalFacilities"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.medicalFacilities === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="medicalFacilitiesNo"
                  name="medicalFacilities"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.medicalFacilities === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>

            {/* Legal Aid Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2">6</td>
              <td className="border border-gray-300 px-4 py-2">Legal Aid</td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="radio"
                  id="legalAidYes"
                  name="legalAid"
                  value="yes"
                  onChange={handleInputChange}
                  checked={formData.legalAid === "yes"}
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  id="legalAidNo"
                  name="legalAid"
                  value="no"
                  onChange={handleInputChange}
                  checked={formData.legalAid === "no"}
                  className="ml-4 mr-2"
                />
                No
              </td>
            </tr>
          </tbody>
        </table>


        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 mt-10 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CaseForm;
