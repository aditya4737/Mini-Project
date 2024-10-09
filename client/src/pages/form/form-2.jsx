import React, { useState } from 'react';

const FormTwo = () => {
    const [formData, setFormData] = useState({
        sexualViolence: {},
        verbalEmotionalAbuse: { otherVerbalAbuse: '' },
        economicViolence: { otherEconomicViolence: '' },
        verbalEmotionalAbuse: { otherVerbalAbuse: [] },  // Initialize as an array
        economicViolence: { otherEconomicViolence: [] },  // Initialize as an array
        additionalInformation: { otherDetails: '' }
    });

    const [newSexualAbuse, setNewSexualAbuse] = useState('');
    const [newVerbalAbuse, setNewVerbalAbuse] = useState('');
    const [newEconomicViolence, setNewEconomicViolence] = useState('');
    const [newAdditionalInfo, setNewAdditionalInfo] = useState('');

    const sexualViolenceField = [
        { name: "forcedIntercourse", label: "Forced Intercourse" },
        { name: "forcedPornography", label: "Forced Pornography" },
        { name: "forcedEntertainment", label: "Forced Entertainment" },
    ];

    const verbalAbuseField = [
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

    const economicViolenceField = [
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

    const handleInputChange = (category, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value,
            },
        }));
    };

    const addOtherSexualAbuseField = () => {
        if (newSexualAbuse) {
            setFormData((prev) => ({
                ...prev,
                sexualViolence: {
                    ...prev.sexualViolence,
                    otherSexualAbuse: [...(prev.sexualViolence.otherSexualAbuse || []), newSexualAbuse],
                },
            }));
            setNewSexualAbuse('');
        }
    };

    const removeOtherSexualAbuseField = (index) => {
        setFormData((prev) => {
            const updatedAbuse = [...prev.sexualViolence.otherSexualAbuse];
            updatedAbuse.splice(index, 1);
            return {
                ...prev,
                sexualViolence: {
                    ...prev.sexualViolence,
                    otherSexualAbuse: updatedAbuse,
                },
            };
        });
    };

    const addOtherVerbalAbuseField = () => {
        if (newVerbalAbuse) {
            setFormData((prev) => ({
                ...prev,
                verbalEmotionalAbuse: {
                    ...prev.verbalEmotionalAbuse,
                    otherVerbalAbuse: [...(prev.verbalEmotionalAbuse.otherVerbalAbuse || []), newVerbalAbuse],
                },
            }));
            setNewVerbalAbuse('');
        }
    };

    const removeOtherVerbalAbuseField = (index) => {
        setFormData((prev) => {
            const updatedAbuse = [...prev.verbalEmotionalAbuse.otherVerbalAbuse];
            updatedAbuse.splice(index, 1);
            return {
                ...prev,
                verbalEmotionalAbuse: {
                    ...prev.verbalEmotionalAbuse,
                    otherVerbalAbuse: updatedAbuse,
                },
            };
        });
    };


    const addOtherEconomicViolenceField = () => {
        if (newEconomicViolence) {
            setFormData((prev) => ({
                ...prev,
                economicViolence: {
                    ...prev.economicViolence,
                    otherEconomicViolence: [...(prev.economicViolence.otherEconomicViolence || []), newEconomicViolence],
                },
            }));
            setNewEconomicViolence('');
        }
    };

    const removeOtherEconomicViolenceField = (index) => {
        setFormData((prev) => {
            const updatedViolence = [...prev.economicViolence.otherEconomicViolence];
            updatedViolence.splice(index, 1);
            return {
                ...prev,
                economicViolence: {
                    ...prev.economicViolence,
                    otherEconomicViolence: updatedViolence,
                },
            };
        });
    };


    const addOtherAdditionalInfo = () => {
        if (newAdditionalInfo) {
            setFormData((prev) => ({
                ...prev,
                additionalInformation: {
                    ...prev.additionalInformation,
                    otherAdditionalInfo: [...(prev.additionalInformation.otherAdditionalInfo || []), newAdditionalInfo],
                },
            }));
            setNewAdditionalInfo('');
        }
    };

    const removeOtherAdditionalInfo = (index) => {
        setFormData((prev) => {
            const updatedInfo = [...prev.additionalInformation.otherAdditionalInfo];
            updatedInfo.splice(index, 1);
            return {
                ...prev,
                additionalInformation: {
                    ...prev.additionalInformation,
                    otherAdditionalInfo: updatedInfo,
                },
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3300/endpoint', {
                method: 'POST', // or 'PUT' based on your use case
                headers: {
                    'Content-Type': 'application/json', // Set the content type as JSON
                },
                body: JSON.stringify(formData), // Convert your data to a JSON string
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <form className="p-4">
                {/* Sexual Violence Section */}
                <h2 className="text-lg font-bold mb-2">Sexual Violence</h2>
                <fieldset className="mb-4">
                    {sexualViolenceField.map((field) => (
                        <div key={field.name} className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.sexualViolence[field.name] || false}
                                    onChange={(e) =>
                                        handleInputChange('sexualViolence', field.name, e.target.checked)
                                    }
                                />
                                <span className="ml-2">{field.label}</span>
                            </label>
                        </div>
                    ))}

                    {/* Display Added Other Sexual Abuse Entries as Text */}
                    {formData.sexualViolence.otherSexualAbuse?.map((abuse, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <span>{abuse}</span>
                            {/* Remove Other Sexual Abuse Button */}
                            <button
                                type="button"
                                onClick={() => removeOtherSexualAbuseField(index)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Add Other Sexual Abuse Input */}
                    <div className="mb-4">
                        <label className="block">Add Other Sexual Abuse:</label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            placeholder="Describe any other sexual abuse"
                            value={newSexualAbuse}
                            onChange={(e) => setNewSexualAbuse(e.target.value)}
                        />
                        {/* Add Button */}
                        <button
                            type="button"
                            onClick={addOtherSexualAbuseField}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            Add
                        </button>
                    </div>
                </fieldset>

                {/* Verbal and Emotional Abuse Section */}
                <h2 className="text-lg font-bold mb-2">Verbal and Emotional Abuse</h2>
                <fieldset className="mb-4">
                    {verbalAbuseField.map((field) => (
                        <div key={field.name} className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.verbalEmotionalAbuse[field.name] || false}
                                    onChange={(e) =>
                                        handleInputChange('verbalEmotionalAbuse', field.name, e.target.checked)
                                    }
                                />
                                <span className="ml-2">{field.label}</span>
                            </label>
                        </div>
                    ))}
                    {/* Display Added Other Verbal Abuse Entries as Text */}
                    {formData.verbalEmotionalAbuse.otherVerbalAbuse?.map((abuse, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <span>{abuse}</span>
                            {/* Remove Other Verbal Abuse Button */}
                            <button
                                type="button"
                                onClick={() => removeOtherVerbalAbuseField(index)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Add Other Verbal Abuse Input */}
                    <div className="mb-4">
                        <label className="block">Add Other Verbal Abuse:</label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            placeholder="Describe any other verbal abuse"
                            value={newVerbalAbuse}
                            onChange={(e) => setNewVerbalAbuse(e.target.value)}
                        />
                        {/* Add Button */}
                        <button
                            type="button"
                            onClick={addOtherVerbalAbuseField}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            Add
                        </button>
                    </div>

                </fieldset>

                {/* Economic Violence Section */}
                <h2 className="text-lg font-bold mb-2">Economic Violence</h2>
                <fieldset className="mb-4">
                    {economicViolenceField.map((field) => (
                        <div key={field.name} className="mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={formData.economicViolence[field.name] || false}
                                    onChange={(e) =>
                                        handleInputChange('economicViolence', field.name, e.target.checked)
                                    }
                                />
                                <span className="ml-2">{field.label}</span>
                            </label>
                        </div>
                    ))}
                    {/* Display Added Other Economic Violence Entries as Text */}
                    {formData.economicViolence.otherEconomicViolence?.map((violence, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <span>{violence}</span>
                            {/* Remove Other Economic Violence Button */}
                            <button
                                type="button"
                                onClick={() => removeOtherEconomicViolenceField(index)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Add Other Economic Violence Input */}
                    <div className="mb-4">
                        <label className="block">Add Other Economic Violence:</label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            placeholder="Describe any other economic violence"
                            value={newEconomicViolence}
                            onChange={(e) => setNewEconomicViolence(e.target.value)}
                        />
                        {/* Add Button */}
                        <button
                            type="button"
                            onClick={addOtherEconomicViolenceField}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            Add
                        </button>
                    </div>

                </fieldset>

                {/* Additional Information Section */}
                <h2 className="text-lg font-bold mb-2">Additional Information</h2>
                <fieldset className="mb-4">
                    {/* Display Added Other Additional Information */}
                    {formData.additionalInformation.otherAdditionalInfo?.map((info, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <span>{info}</span>
                            {/* Remove Other Additional Info Button */}
                            <button
                                type="button"
                                onClick={() => removeOtherAdditionalInfo(index)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Add Other Additional Information Input */}
                    <div className="mb-4">
                        <label className="block">Add Other Information:</label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            placeholder="Add any additional information"
                            value={newAdditionalInfo}
                            onChange={(e) => setNewAdditionalInfo(e.target.value)}
                        />
                        {/* Add Button */}
                        <button
                            type="button"
                            onClick={addOtherAdditionalInfo}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            Add
                        </button>
                    </div>
                </fieldset>

                {/* Submit Button */}
                <div className="mt-6">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormTwo;
