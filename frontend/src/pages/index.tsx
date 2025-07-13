import React from 'react';

export default function Lobby() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">LeetBrawl 1v1 Lobby</h1>
        <p className="mb-6 text-gray-600">Race to solve coding problems in real-time!</p>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mb-2 w-full">Create Match</button>
        <button className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 transition w-full">Join Match</button>
      </div>
    </div>
  );
} 