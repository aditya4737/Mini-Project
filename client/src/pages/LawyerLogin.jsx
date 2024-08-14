import React, { useState } from 'react';

export const LawyerLogin = () => {
    // Define state variables for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from submitting the traditional way
        console.log("Username:", username);
        console.log("Password:", password);
        // You can add your login logic here (e.g., API call)
    };

    return (
        <div className='flex min-h-screen flex-1 flex-col'>
        <div className="flex justify-center items-center min-h-full text-gray-800">
            <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center">
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Lawyer Login</h2>
                <p className="text-sm mb-8 text-gray-500">Enter your credentials to access the portal.</p>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        required
                        className="w-full p-3 mb-4 border border-gray-400 rounded-lg text-base"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 mb-4 border border-gray-400 rounded-lg text-base"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg transition duration-300 hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <a href="#" className="text-blue-600 mt-4 inline-block hover:underline">Forgot Password?</a>
                <div className="mt-6 text-sm">
                    <p>Don't have an account? <a href="#" id="signupLink" className="text-blue-600 hover:underline">Sign Up</a></p>
                </div>
            </div>
        </div>
        </div>
    );
};
