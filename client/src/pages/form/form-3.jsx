import React, { useState } from 'react';
//coment i just wrote
//another comement
const FormThree = () => {
  const [dowryDemands, setDowryDemands] = useState([{ id: 1, value: '' }]);
  const [attachedDocuments, setAttachedDocuments] = useState([
    { name: 'medicoLegalCertificate', label: 'Medico Legal Certificate' },
    { name: 'doctorsCertificate', label: 'Doctor’s Certificate or Any Other Prescription' },
    { name: 'listOfStridhan', label: 'List of Stridhan' },
    { name: 'otherDocument', label: 'Any Other Document' },
  ]);
  const [formData, setFormData] = useState({
    dowryRelatedHarassment: { otherDowryDetails: '' },
    protectionOrder: '',
    otherOrderDetails: '',
    legalOrders: [], 
  });
  const [otherOrders, setOtherOrders] = useState([]);
  const [assistanceOptions, setAssistanceOptions] = useState([
    { id: 1, name: 'Counsellor', status: '' },
    { id: 2, name: 'Police Assistance', status: '' },
    { id: 3, name: 'Assistance for Initiating Criminal Proceedings', status: '' },
    { id: 4, name: 'Shelter Home', status: '' },
    { id: 5, name: 'Medical Facilities', status: '' },
    { id: 6, name: 'Legal Aid', status: '' },
  ]);

  // Handle changes in dowry demand fields
  const handleDowryDemandChange = (id, event) => {
    const updatedDemands = dowryDemands.map(demand =>
      demand.id === id ? { ...demand, value: event.target.value } : demand
    );
    setDowryDemands(updatedDemands);
  };

  // Add a new dowry demand field
  const addDowryDemand = () => {
    setDowryDemands([...dowryDemands, { id: Date.now(), value: '' }]);
  };

  // Remove a dowry demand field
  const removeDowryDemand = (id) => {
    setDowryDemands(dowryDemands.filter(demand => demand.id !== id));
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Handle assistance option status change
  const handleAssistanceChange = (id, status) => {
    const updatedOptions = assistanceOptions.map(option =>
      option.id === id ? { ...option, status } : option
    );
    setAssistanceOptions(updatedOptions);
  };

  // Handle changes to legal order fields
  const handleLegalOrderChange = (index, field, value) => {
    const updatedLegalOrders = formData.legalOrders.map((legalOrder, i) => 
      i === index ? { ...legalOrder, [field]: value } : legalOrder
    );
    setFormData({ ...formData, legalOrders: updatedLegalOrders });
  };

  // Add a new legal order to the form
  const addLegalOrder = () => {
    setFormData({
      ...formData,
      legalOrders: [...formData.legalOrders, { order: '', details: '' }],
    });
  };

  // Remove a legal order from the form
  const removeLegalOrder = (index) => {
    setFormData({
      ...formData,
      legalOrders: formData.legalOrders.filter((_, i) => i !== index),
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, dowryDemands, attachedDocuments, otherOrders, assistanceOptions);
    // Handle form submission logic here
  };

  const handleAddOtherOrder = () => {
    if (formData.otherOrderDetails.trim() !== "") {
      setOtherOrders([...otherOrders, formData.otherOrderDetails]);
      setFormData({ ...formData, otherOrderDetails: "" }); // Clear the input field after adding
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-lg">
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

      Orders Section
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

      Other Orders Section
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
          onChange={handleInputChange}
          placeholder="Enter other orders"
          className="w-full px-4 py-3 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleAddOtherOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
        >
          Add Order
        </button>
      </div>

      {/* Assistance Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Assistance that You Need under the Protection of Women from Domestic Violence Act, 2005
      </h2>
      {assistanceOptions.map((option) => (
        <div key={option.id} className="flex items-center mb-4">
          <span className="mr-4">{option.name}</span>
          <input
            type="radio"
            id={`${option.id}-yes`}
            name={`assistance-${option.id}`}
            value="yes"
            checked={option.status === 'yes'}
            onChange={() => handleAssistanceChange(option.id, 'yes')}
            className="mr-2"
          />
          Yes
          <input
            type="radio"
            id={`${option.id}-no`}
            name={`assistance-${option.id}`}
            value="no"
            checked={option.status === 'no'}
            onChange={() => handleAssistanceChange(option.id, 'no')}
            className="ml-4 mr-2"
          />
          No
        </div>
      ))}

      <button
        type="submit"
        className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
      >
        Submit
      </button>
    </form>
    </div>
  );
};

export default FormThree;
// import React from 'react'

// function FormThree() {
//   return (
//     <div >FormThree</div>
//   )
// }

// export default FormThree;