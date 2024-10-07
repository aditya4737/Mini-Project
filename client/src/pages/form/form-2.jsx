
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormTwo = () => {
    const navigate = useNavigate();

    // Consolidated state for all form data
    const [formData, setFormData] = useState({
        respondentDetails: [{ name: "", age: "", sex: "", relation: "" }],
        childrenDetails: [{ name: "", age: "", sex: "", residingWith: "" }],
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
            { id: "physicalViolence", label: "Physical Violence", checked: false },
            { id: "sexualViolence", label: "Sexual Violence", checked: false },
            { id: "emotionalViolence", label: "Emotional Violence", checked: false },
            { id: "economicViolence", label: "Economic Violence", checked: false },
            { id: "dowryViolence", label: "Dowry Violence", checked: false },
        ],


        sexualViolence: {
            forcedIntercourse: false,
            forcedPornography: false,
            forcedEntertainment: false,
            otherSexualAbuse: [""],
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
        incidents: [{ date: "", time: "", place: "", person: "" }],
        dowryDemands: [{ id: Date.now(), value: "" }],
    });

    const [newSexualAbuse, setNewSexualAbuse] = useState(initialValue);

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

    const dowryHarassmentField = [
        { name: "demandingDowry", label: "Demanding Dowry" },
        { name: "harassmentForDowry", label: "Harassment for Dowry" }
    ];

    // Function to handle changes to the "Other Sexual Abuse" inputs
    const handleOtherAbuseChange = (index, value) => {
        const updatedOtherAbuse = [...formData.sexualViolence.otherSexualAbuse];
        updatedOtherAbuse[index] = value;
        setFormData({
            ...formData,
            sexualViolence: {
                ...formData.sexualViolence,
                otherSexualAbuse: updatedOtherAbuse,
            },
        });
    };

    // Function to add a new empty input field for "Other Sexual Abuse"
    const addOtherSexualAbuseField = () => {
        setFormData({
            ...formData,
            sexualViolence: {
                ...formData.sexualViolence,
                otherSexualAbuse: [...formData.sexualViolence.otherSexualAbuse, ''],
            },
        });
    };

    // Function to remove an "Other Sexual Abuse" input field
    const removeOtherSexualAbuseField = (index) => {
        const updatedOtherAbuse = formData.sexualViolence.otherSexualAbuse.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            sexualViolence: {
                ...formData.sexualViolence,
                otherSexualAbuse: updatedOtherAbuse,
            },
        });
    };



    // Handler for checkbox inputs
    const handleCheckboxChange = (section, field) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: !prev[section][field],
            },
        }));
    };

    // Handler for text inputs
    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    // Handler for dynamic fields like respondents and children
    const handleDynamicChange = (section, index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            ),
        }));
    };

    // Adding a new entry (e.g., a new dowry demand)
    const addNewEntry = (section) => {
        setFormData((prev) => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now(), value: "" }],
        }));
    };

    // Removing an entry (e.g., removing a dowry demand)
    const removeEntry = (section, id) => {
        setFormData((prev) => ({
            ...prev,
            [section]: prev[section].filter((item) => item.id !== id),
        }));
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
                                    checked={formData.sexualViolence[field.name]}
                                    onChange={(e) =>
                                        handleInputChange('sexualViolence', field.name, e.target.checked)
                                    }
                                />
                                <span className="ml-2">{field.label}</span>
                            </label>
                        </div>
                    ))}

                    {/* Display Added Other Sexual Abuse Entries as Text */}
{formData.sexualViolence.otherSexualAbuse.map((abuse, index) => (
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
                                    checked={formData.verbalEmotionalAbuse[field.name]}
                                    onChange={(e) =>
                                        handleInputChange('verbalEmotionalAbuse', field.name, e.target.checked)
                                    }
                                />
                                <span className="ml-2">{field.label}</span>
                            </label>
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block">Other Verbal Abuse:</label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            placeholder="Describe any other verbal abuse"
                            value={formData.verbalEmotionalAbuse.otherVerbalAbuse}
                            onChange={(e) =>
                                handleInputChange('verbalEmotionalAbuse', 'otherVerbalAbuse', e.target.value)
                            }
                        />
                    </div>
                </fieldset>


                {/* Economic Violence Section */}
                <h2 className="text-lg font-bold mb-2">Economic Violence</h2>
                {economicViolenceField.map((field) => (
                    <div key={field.name} className="mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={formData.economicViolence[field.name]}
                                onChange={(e) =>
                                    handleInputChange('economicViolence', field.name, e.target.checked)
                                }
                            />
                            <span className="ml-2">{field.label}</span>
                        </label>
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block">Other Economic Violence:</label>
                    <input
                        type="text"
                        className="form-input mt-1 block w-full"
                        value={formData.economicViolence.otherEconomicViolence}
                        onChange={(e) =>
                            handleInputChange('economicViolence', 'otherEconomicViolence', e.target.value)
                        }
                    />
                </div>

                {/* Dowry Related Harassment Section */}
                {/* <h2 className="text-lg font-bold mb-2">Dowry Related Harassment</h2>
                {formData.dowryHarassmentField.map((demand, index) => (
                    <div key={demand.id} className="mb-2">
                        <label className="block">Dowry Demand {index + 1}:</label>
                        <input
                            type="text"
                            className="form-input mt-1 block w-full"
                            value={demand.value}
                            onChange={(e) =>
                                handleInputChange(
                                    'dowryRelatedHarassment',
                                    `dowryDemands.${index}`,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block">Other Dowry Details:</label>
                    <input
                        type="text"
                        className="form-input mt-1 block w-full"
                        value={formData.dowryRelatedHarassment.otherDowryDetails}
                        onChange={(e) =>
                            handleInputChange('dowryRelatedHarassment', 'otherDowryDetails', e.target.value)
                        }
                    />
                </div> */}

            </form>
        </div>
    );
};
export default FormTwo;
