import React from 'react';

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
      <div className="container mt-8 p-5 rounded-lg shadow-lg bg-white w-full max-w-3xl">
        <div className="text-center text-2xl font-bold text-black mb-4">Let's Chat</div>
        <div className="chat h-96 overflow-y-scroll mb-4 p-3 border-2 border-gray-600 rounded-lg bg-white" id="chat">
          {/* Chat messages will go here */}
        </div>
        <div className="relative">
          <input
            type="text"
            className="input w-full p-3 border-2 border-gray-300 rounded-lg outline-none text-xl pr-16"
            id="input"
            placeholder="Type your message here..."
          />
          <button
            type="button"
            className="button absolute top-1/2 right-3 transform -translate-y-1/2 inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
