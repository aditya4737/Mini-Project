import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFormsData = () => {
  const [formOneData, setFormOneData] = useState(null);
  const [formTwoData, setFormTwoData] = useState(null);
  const [formThreeData, setFormThreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        console.log('Token:', token); // Log the token for debugging
        
        if (!token) {
          throw new Error('No token found. User must be logged in.');
        }

        const headers = { Authorization: `Bearer ${token}` };

        const formOneResponse = await axios.get('/api/formone', { headers });
        const formTwoResponse = await axios.get('/api/formtwo', { headers });
        const formThreeResponse = await axios.get('/api/formthree', { headers });

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

      <h2 className="text-xl font-semibold mb-2">Form One Data</h2>
      <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(formOneData, null, 2)}</pre>

      <h2 className="text-xl font-semibold mb-2">Form Two Data</h2>
      <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(formTwoData, null, 2)}</pre>

      <h2 className="text-xl font-semibold mb-2">Form Three Data</h2>
      <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(formThreeData, null, 2)}</pre>
    </div>
  );
};

export default UserFormsData;
