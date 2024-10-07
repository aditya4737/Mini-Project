import React, { useState, createContext } from 'react';
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

    violenceType: [
      { id: 'physicalViolence', label: 'Physical Violence', checked: false },
      { id: 'sexualViolence', label: 'Sexual Violence', checked: false },
      { id: 'emotionalViolence', label: 'Emotional Violence', checked: false },
      { id: 'economicViolence', label: 'Economic Violence', checked: false },
      { id: 'dowryViolence', label: 'Dowry Violence', checked: false },
    ],
    legalOrders: [
      { order: '', details: '' }, // Initial legal order
    ],
    sexualViolence: {
      forcedIntercourse: false,
      forcedPornography: false,
      forcedEntertainment: false,
      otherSexualAbuse: '',
    },
    economicViolence: {
      noMoneyForChildren: false,
      noFoodClothesMedicine: false,
      forcedOutOfHouse: false,
      preventAccessHouse: false,
      preventEmployment: false,
      noEmployment: false,
      nonPaymentRent: false,
      noUseHouseholdItems: false,
      sellingStridhan: false,
      takingSalary: false,
      disposingStridhan: false,
      nonPaymentBills: false,
      otherEconomicViolence: "",
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
    incidents: [{ date: "", time: "", place: "", person: "" }],
  });

  const economicViolenceOptions = [
    { id: 'noMoneyForChildren', label: 'Not providing money for maintaining you or your children' },
    { id: 'noFoodClothesMedicine', label: 'Not providing food, clothes, medicine, etc., for you or your children' },
    { id: 'forcedOutOfHouse', label: 'Forcing you out of the house you live in' },
    { id: 'preventAccessHouse', label: 'Preventing you from accessing or using any part of the house' },
    { id: 'preventEmployment', label: 'Preventing or obstructing you from carrying on your employment' },
    { id: 'noEmployment', label: 'Not allowing you to take up an employment' },
    { id: 'nonPaymentRent', label: 'Non-payment of rent in case of a rented accommodation' },
    { id: 'noUseHouseholdItems', label: 'Not allowing you to use clothes or articles of general household use' },
    { id: 'sellingStridhan', label: 'Selling or pawning your stridhan or any other valuables without informing you and without your consent' },
    { id: 'takingSalary', label: 'Forcibly taking away your salary, income, or wages, etc.' },
    { id: 'disposingStridhan', label: 'Disposing your stridhan' },
    { id: 'nonPaymentBills', label: 'Non-payment of other bills such as electricity, etc.' },
  ];

  const verbalEmotionalAbuseOptions = [
    { id: 'accusation', label: 'Accusation/aspersion on your character or conduct, etc.' },
    { id: 'insultDowry', label: 'Insult for not bringing dowry, etc.' },
    { id: 'insultNoMaleChild', label: 'Insult for not having a male child' },
    { id: 'insultNoChild', label: 'Insult for not having any child' },
    { id: 'demeaningRemarks', label: 'Demeaning, humiliating or undermining remarks/statement' },
    { id: 'ridicule', label: 'Ridicule' },
    { id: 'nameCalling', label: 'Name calling' },
    { id: 'forcingNotAttendSchool', label: 'Forcing you to not attend school, college or any other educational institution' },
    { id: 'preventingJob', label: 'Preventing you from taking up a job' },
    { id: 'preventingLeavingHouse', label: 'Preventing you from leaving the House' },
    { id: 'preventingMeetingPerson', label: 'Preventing you from meeting any particular person' },
    { id: 'forcedMarriage', label: 'Forcing you to get married against your will' },
    { id: 'preventingMarriageOfChoice', label: 'Preventing you from marrying a person of your choice' },
    { id: 'forcedMarriageAgainstWill', label: 'Forcing you to marry a person of his/their own choice' },
  ];

  const attachedDocuments = [
    { name: 'medicoLegalCertificate', label: 'Medico Legal Certificate' },
    { name: 'doctorsCertificate', label: 'Doctor’s Certificate or Any Other Prescription' },
    { name: 'listOfStridhan', label: 'List of Stridhan' },
    { name: 'otherDocument', label: 'Any Other Document' },
  ];



  const AbuseCheckbox = ({ name, label, checked, onChange }) => (
    <div className="mb-4">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name} className="ml-2">
        {label}
      </label>
    </div>
  );

  const DocumentUpload = ({ name, label, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded"
      />
    </div>
  );

  // Handlers for respondent and children details changes
  const handleRespondentChange = (index, e) => {
    const newDetails = [...respondentDetails];
    newDetails[index][e.target.name] = e.target.value;
    setRespondentDetails(newDetails);
  };

  // Handlers for adding/removing respondents and children
  const handleAddRespondent = () => {
    setRespondentDetails([
      ...respondentDetails,
      { name: "", age: "", sex: "", relation: "" },
    ]);
  };


  const handleRemoveRespondent = (index) => {
    const newDetails = [...respondentDetails];
    newDetails.splice(index, 1);
    setRespondentDetails(newDetails);
  };


  const handleChildrenChange = (index, e) => {
    const newDetails = [...childrenDetails];
    newDetails[index][e.target.name] = e.target.value;
    setChildrenDetails(newDetails);
  };

  const handleAddChild = () => {
    setChildrenDetails([
      ...childrenDetails,
      { name: "", age: "", sex: "", residingWith: "" },
    ]);
  };

  const handleRemoveChild = (index) => {
    const newDetails = [...childrenDetails];
    newDetails.splice(index, 1);
    setChildrenDetails(newDetails);
  };

  const handleIncidentChange = (index, event) => {
    const { name, value } = event.target;
    const newIncidents = [...formData.incidents];
    newIncidents[index] = { ...newIncidents[index], [name]: value };
    setFormData({ ...formData, incidents: newIncidents });
  };

  const handleAddIncident = () => {
    setFormData({
      ...formData,
      incidents: [...formData.incidents, { date: "", time: "", place: "", person: "" }],
    });
  };

  const handleRemoveIncident = (index) => {
    const newIncidents = [...formData.incidents];
    newIncidents.splice(index, 1);
    setFormData({ ...formData, incidents: newIncidents });
  };


  // Handlers for form field changes
  const handleViolenceTypeChange = (index) => {
    const newViolenceType = [...formData.violenceType];
    newViolenceType[index].checked = !newViolenceType[index].checked; // Toggle the checked status
    setFormData({ ...formData, violenceType: newViolenceType });
  };

  const handleLegalOrderChange = (index, field, value) => {
    const newLegalOrders = [...formData.legalOrders];
    newLegalOrders[index][field] = value; // Update the specific field of the legal order
    setFormData({ ...formData, legalOrders: newLegalOrders });
  };

  const addLegalOrder = () => {
    setFormData({
      ...formData,
      legalOrders: [...formData.legalOrders, { order: '', details: '' }], // Add new legal order
    });
  };

  const removeLegalOrder = (index) => {
    const newLegalOrders = formData.legalOrders.filter((_, i) => i !== index); // Remove the legal order at the specified index
    setFormData({ ...formData, legalOrders: newLegalOrders });
  };


  const handleSexualViolenceChange = (field, value) => {
    setFormData({
      ...formData,
      sexualViolence: {
        ...formData.sexualViolence,
        [field]: value, // Dynamically update the field
      },
    });
  };


  const handleVerbalEmotionalAbuseChange = (field, value) => {
    setFormData({
      ...formData,
      verbalEmotionalAbuse: {
        ...formData.verbalEmotionalAbuse,
        [field]: value, // Dynamically update the selected field
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

  const [dowryDemands, setDowryDemands] = useState([{ id: Date.now(), value: "" }]);

  const handleDowryDemandChange = (id, event) => {
    const updatedDemands = dowryDemands.map((demand) =>
      demand.id === id ? { ...demand, value: event.target.value } : demand
    );
    setDowryDemands(updatedDemands);
  };

  const addDowryDemand = () => {
    setDowryDemands([...dowryDemands, { id: Date.now(), value: "" }]);
  };

  const removeDowryDemand = (id) => {
    setDowryDemands(dowryDemands.filter((demand) => demand.id !== id));
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


  const [assistanceOptions, setAssistanceOptions] = useState([
    { id: 1, name: 'Counsellor', status: '' },
    { id: 2, name: 'Police Assistance', status: '' },
    { id: 3, name: 'Assistance for Initiating Criminal Proceedings', status: '' },
    { id: 4, name: 'Shelter Home', status: '' },
    { id: 5, name: 'Medical Facilities', status: '' },
    { id: 6, name: 'Legal Aid', status: '' },
  ]);

  // Function to handle the change in the radio button for each option
  const handleAssistanceChange = (id, value) => {
    setAssistanceOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, status: value } : option
      )
    );
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData,"his");
    navigate(`/caseEinvoice`, { state: { formData } });
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
                <div className="flex items-center space-x-4">
                  {/* Age Field */}
                  <div className="flex flex-col">
                    <label htmlFor={`respondentAge-${index}`} className="text-sm font-medium">Age</label>
                    <input
                      type="text"
                      id={`respondentAge-${index}`}
                      name="age"
                      placeholder="Enter age"
                      value={respondent.age}
                      onChange={(e) => handleRespondentChange(index, e)}
                      className="p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  {/* Sex Field */}
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
                      value={child.age}
                      onChange={(e) => handleChildrenChange(index, e)}
                      className="p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  {/* Sex Field */}
                  <div className="flex flex-col">
                    <label htmlFor={`childSex-${index}`} className="text-sm font-medium">Sex</label>
                    <select
                      id={`childSex-${index}`}
                      name="sex"
                      value={child.sex}
                      onChange={(e) => handleChildrenChange(index, e)}
                      className="p-2 border border-gray-300 rounded"
                      required
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
        </div>


        <div>
          {/* Other form inputs for complainant and respondent... */}

          <h2 className="text-2xl font-semibold mt-8 mb-4">Incident Details</h2>
          {formData.incidents.map((incident, index) => (
            <div key={index} className="mb-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor={`incidentDate-${index}`}>
                  Date of Incident
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

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor={`incidentTime-${index}`}>
                  Time of Incident
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

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor={`incidentPlace-${index}`}>
                  Place of Incident
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

              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor={`incidentPerson-${index}`}>
                  Person Present at Incident
                </label>
                <input
                  type="text"
                  id={`incidentPerson-${index}`}
                  name="person"
                  value={incident.person}
                  onChange={(e) => handleIncidentChange(index, e)}
                  className="w-full px-4 py-3 border border-gray-300 rounded"
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveIncident(index)}
                  className="text-red-500 hover:underline mb-4"
                >
                  Remove Incident
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddIncident}
            className="text-blue-500 hover:underline mb-6"
          >
            Add Incident
          </button>

          {/* Additional form sections... */}
        </div>

        {/* Type of Violence */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Type of Violence</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Types of Violence</label>
          <div className="space-y-2">
            {formData.violenceType.map((violence, index) => (
              <div key={violence.id}>
                <input
                  type="checkbox"
                  id={violence.id}
                  name={violence.id}
                  checked={violence.checked} // Dynamic value binding
                  onChange={() => handleViolenceTypeChange(index)} // Pass index to the handler
                  className="cursor-pointer" // Ensure the pointer cursor is set
                />
                <label htmlFor={violence.id} className="ml-2 cursor-pointer"> {/* Ensure label is clickable */}
                  {violence.label} {/* Use the label directly */}
                </label>
              </div>
            ))}
          </div>
        </div>



        {/* Legal Order Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Legal Orders (if any)</h2>
        {formData.legalOrders.map((legalOrder, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor={`legalOrder_${index}`}>
              Legal Order Issued
            </label>
            <input
              type="text"
              id={`legalOrder_${index}`}
              name={`legalOrder_${index}`}
              value={legalOrder.order}
              onChange={(e) => handleLegalOrderChange(index, 'order', e.target.value)} // Handle change
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />

            <label className="block text-gray-700 mb-2" htmlFor={`orderDetails_${index}`}>
              Details of Legal Order
            </label>
            <textarea
              id={`orderDetails_${index}`}
              name={`orderDetails_${index}`}
              value={legalOrder.details}
              onChange={(e) => handleLegalOrderChange(index, 'details', e.target.value)} // Handle change
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />

            {/* Remove button for legal order */}
            <button
              type="button"
              onClick={() => removeLegalOrder(index)}
              className="text-red-600 mt-2"
            >
              Remove Legal Order
            </button>
          </div>
        ))}

        {/* Button to add a new legal order */}
        <button
          type="button"
          onClick={addLegalOrder}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Another Legal Order
        </button>


        {/* Sexual Violence Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Sexual Violence</h2>
        <div className="mb-4 space-y-2">
          {[
            { id: 'forcedIntercourse', label: 'Forced sexual intercourse' },
            { id: 'forcedPornography', label: 'Forced to watch pornography or other obscene material' },
            { id: 'forcedEntertainment', label: 'Forcibly using you to entertain others' }
          ].map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                checked={formData.sexualViolence[item.id]} // Dynamic value binding
                onChange={(e) => handleSexualViolenceChange(item.id, e.target.checked)} // Update dynamically
              />
              <label htmlFor={item.id} className="ml-2">
                {item.label}
              </label>
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mt-2" htmlFor="otherSexualAbuse">
              Any other act of sexual nature (specify):
            </label>
            <input
              type="text"
              id="otherSexualAbuse"
              name="otherSexualAbuse"
              value={formData.sexualViolence.otherSexualAbuse}
              onChange={(e) => handleSexualViolenceChange('otherSexualAbuse', e.target.value)} // Handle text input dynamically
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />
          </div>
        </div>


        {/* Verbal and Emotional Abuse Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Verbal and Emotional Abuse</h2>
        <div className="mb-4 space-y-2">
          {verbalEmotionalAbuseOptions.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                name={item.id}
                checked={formData.verbalEmotionalAbuse[item.id]} // Dynamic value binding
                onChange={(e) => handleVerbalEmotionalAbuseChange(item.id, e.target.checked)} // Dynamically handle the change
              />
              <label htmlFor={item.id} className="ml-2">
                {item.label}
              </label>
            </div>
          ))}

          {/* Other Verbal or Emotional Abuse */}
          <div>
            <label className="block text-gray-700 mt-2" htmlFor="otherVerbalAbuse">
              Any other verbal or emotional abuse (please specify):
            </label>
            <input
              type="text"
              id="otherVerbalAbuse"
              name="otherVerbalAbuse"
              value={formData.verbalEmotionalAbuse.otherVerbalAbuse} // Text input binding
              onChange={(e) => handleVerbalEmotionalAbuseChange('otherVerbalAbuse', e.target.value)} // Handle text input
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />
          </div>
        </div>



        {/* Economic Violence */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Economic Violence</h2>
        <div className="mb-4 space-y-2">
          {economicViolenceOptions.map(option => (
            <div key={option.id}>
              <input
                type="checkbox"
                id={option.id}
                name={option.id}
                checked={formData.economicViolence[option.id]}
                onChange={handleEconomicViolenceChange}
              />
              <label htmlFor={option.id} className="ml-2">
                {option.label}
              </label>
            </div>
          ))}
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



        <div>
          {/* Dowry Related Harassment */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Dowry Related Harassment</h2>
          {dowryDemands.map((demand, index) => (
            <div key={demand.id} className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor={`dowryDemand-${demand.id}`}>
                Dowry Demand {index + 1}:
              </label>
              <input
                type="text"
                id={`dowryDemand-${demand.id}`}
                name={`dowryDemand-${demand.id}`}
                value={demand.value}
                onChange={(e) => handleDowryDemandChange(demand.id, e)}
                className="w-full px-4 py-3 border border-gray-300 rounded"
              />
              <button
                type="button"
                className="mt-2 text-red-500 hover:underline"
                onClick={() => removeDowryDemand(demand.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 hover:underline mb-4"
            onClick={addDowryDemand}
          >
            Add another Dowry Demand
          </button>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="otherDowryDetails">
              Any other detail with regard to dowry:
            </label>
            <input
              type="text"
              id="otherDowryDetails"
              name="otherDowryDetails"
              value={formData.dowryRelatedHarassment.otherDowryDetails}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded"
            />
          </div>

          {/* List of Documents Attached */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">List of Documents Attached</h2>
          {attachedDocuments.map((doc) => (
            <div key={doc.name} className="mb-4">
              <label className="block text-gray-700" htmlFor={doc.name}>
                {doc.label}:
              </label>
              <input
                type="file"
                id={doc.name}
                name={doc.name}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded"
              />
            </div>
          ))}
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

        <div>
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
              {assistanceOptions.map((option, index) => (
                <tr key={option.id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{option.name}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="radio"
                      id={`${option.name}Yes`}
                      name={`assistance-${option.id}`}
                      value="yes"
                      onChange={() => handleAssistanceChange(option.id, 'yes')}
                      checked={option.status === 'yes'}
                      className="mr-2"
                    />
                    Yes
                    <input
                      type="radio"
                      id={`${option.name}No`}
                      name={`assistance-${option.id}`}
                      value="no"
                      onChange={() => handleAssistanceChange(option.id, 'no')}
                      checked={option.status === 'no'}
                      className="ml-4 mr-2"
                    />
                    No
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


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
