import React from 'react';

const Chat = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div class="container mx-auto mt-12 p-5 rounded-lg shadow-lg bg-white">
        <div class="text-center text-2xl font-bold text-black">Let's Chat</div>
        <div class="chat h-96 overflow-y-scroll my-5 p-3 border-2 border-gray-600 rounded-lg bg-white" id="chat">
        </div>
        <div class="relative">
          <input type="text"
            class="input w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none text-xl"
            id="input" placeholder="Type your message here...." />
          <button
        type="button"
        class="button absolute top-1/2 right-1 transform -translate-y-1/2 inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white"
        aria-label="Send message"
      >
        Send
      </button>
        </div>
      </div>
    </div>
  );
}

export default Chat
