
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useEffect } from 'react';

const FormTwo = () => {
    const { login } = useAuth();
    useEffect(() => {
       
        const pass = localStorage.getItem('pass');
        const email = localStorage.getItem('email');
        login(pass, email, "1");
        
      }, []);
    const [formData, setFormData] = useState({
        sexualViolence: {
            forcedIntercourse: false,
            forcedPornography: false,
            forcedEntertainment: false,
            otherSexualAbuse: []
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
            otherVerbalAbuse: []
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
            otherEconomicViolence: []
        },
        additionalInformation: {
            otherAdditionalInfo: []
        }
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
        { id: 'preventingLeavingHouse', label: 'Preventing you from leaving the house' },
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
        { id: 'noEmployment', label: 'Not allowing you to take up employment' },
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

    const addOtherField = (category, newValue, field) => {
        if (newValue) {
            setFormData((prev) => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: [...(prev[category][field] || []), newValue],
                },
            }));
        }
    };

    const removeOtherField = (category, index, field) => {
        setFormData((prev) => {
            const updatedField = [...prev[category][field]];
            updatedField.splice(index, 1);
            return {
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: updatedField,
                },
            };
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error("No token found. Please login again.");
            }
    
            const response = await axios.post('http://localhost:3300/api/formtwo', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log('Success:', response.data);
            navigate("/formthree");
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };
    
     return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <form className="p-4" onSubmit={handleSubmit}>
                {/* Sexual Violence Section */}
                <h2 className="text-lg font-bold mb-2">Sexual Violence</h2>
                <fieldset className="mb-4">
                    {sexualViolenceField.map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>
                                <input
                                    type="checkbox"
                                    id={field.name}
                                    checked={formData.sexualViolence[field.name] || false}
                                    onChange={(e) =>
                                        handleInputChange('sexualViolence', field.name, e.target.checked)
                                    }
                                />
                                {field.label}
                            </label>
                        </div>
                    ))}
                    {/* Add other forms of Sexual Violence */}
                    <div className="mt-2">
                        <input
                            type="text"
                            value={newSexualAbuse}
                            onChange={(e) => setNewSexualAbuse(e.target.value)}
                            placeholder="Add another type of Sexual Violence"
                        />
                        <button
                            type="button"
                            onClick={() => addOtherField('sexualViolence', newSexualAbuse, 'otherSexualAbuse')}
                        >
                            Add
                        </button>
                    </div>
                    {formData.sexualViolence.otherSexualAbuse?.map((item, index) => (
                        <div key={index}>
                            {item}
                            <button type="button" onClick={() => removeOtherField('sexualViolence', index, 'otherSexualAbuse')}>
                                Remove
                            </button>
                        </div>
                    ))}
                </fieldset>

                {/* Verbal and Emotional Abuse Section */}
                <h2 className="text-lg font-bold mb-2">Verbal/Emotional Abuse</h2>
                <fieldset className="mb-4">
                    {verbalAbuseField.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id}>
                                <input
                                    type="checkbox"
                                    id={field.id}
                                    checked={formData.verbalEmotionalAbuse[field.id] || false}
                                    onChange={(e) =>
                                        handleInputChange('verbalEmotionalAbuse', field.id, e.target.checked)
                                    }
                                />
                                {field.label}
                            </label>
                        </div>
                    ))}
                    {/* Add other forms of Verbal Abuse */}
                    <div className="mt-2">
                        <input
                            type="text"
                            value={newVerbalAbuse}
                            onChange={(e) => setNewVerbalAbuse(e.target.value)}
                            placeholder="Add another type of Verbal/Emotional Abuse"
                        />
                        <button
                            type="button"
                            onClick={() => addOtherField('verbalEmotionalAbuse', newVerbalAbuse, 'otherVerbalAbuse')}
                        >
                            Add
                        </button>
                    </div>
                    {formData.verbalEmotionalAbuse.otherVerbalAbuse?.map((item, index) => (
                        <div key={index}>
                            {item}
                            <button type="button" onClick={() => removeOtherField('verbalEmotionalAbuse', index, 'otherVerbalAbuse')}>
                                Remove
                            </button>
                        </div>
                    ))}
                </fieldset>

                {/* Economic Violence Section */}
                <h2 className="text-lg font-bold mb-2">Economic Violence</h2>
                <fieldset className="mb-4">
                    {economicViolenceField.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id}>
                                <input
                                    type="checkbox"
                                    id={field.id}
                                    checked={formData.economicViolence[field.id] || false}
                                    onChange={(e) =>
                                        handleInputChange('economicViolence', field.id, e.target.checked)
                                    }
                                />
                                {field.label}
                            </label>
                        </div>
                    ))}
                    {/* Add other forms of Economic Violence */}
                    <div className="mt-2">
                        <input
                            type="text"
                            value={newEconomicViolence}
                            onChange={(e) => setNewEconomicViolence(e.target.value)}
                            placeholder="Add another type of Economic Violence"
                        />
                        <button
                            type="button"
                            onClick={() => addOtherField('economicViolence', newEconomicViolence, 'otherEconomicViolence')}
                        >
                            Add
                        </button>
                    </div>
                    {formData.economicViolence.otherEconomicViolence?.map((item, index) => (
                        <div key={index}>
                            {item}
                            <button type="button" onClick={() => removeOtherField('economicViolence', index, 'otherEconomicViolence')}>
                                Remove
                            </button>
                        </div>
                    ))}
                </fieldset>

                {/* Additional Information Section */}
                <h2 className="text-lg font-bold mb-2">Additional Information</h2>
                <div className="mt-2">
                    <input
                        type="text"
                        value={newAdditionalInfo}
                        onChange={(e) => setNewAdditionalInfo(e.target.value)}
                        placeholder="Add any additional information"
                    />
                    <button
                        type="button"
                        onClick={() => addOtherField('additionalInformation', newAdditionalInfo, 'otherAdditionalInfo')}
                    >
                        Add
                    </button>
                </div>
                {formData.additionalInformation.otherAdditionalInfo?.map((item, index) => (
                    <div key={index}>
                        {item}
                        <button type="button" onClick={() => removeOtherField('additionalInformation', index, 'otherAdditionalInfo')}>
                            Remove
                        </button>
                    </div>
                ))}

                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormTwo;
