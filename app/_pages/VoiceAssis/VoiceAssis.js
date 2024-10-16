"use client"; // Ensure this component can use hooks

import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const VoiceAssistant = () => {
  const [response, setResponse] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [loading, setLoading] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span className="text-red-500">Your browser does not support speech recognition.</span>;
  }

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = async () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      setLoading(true);
      const maxRetries = 5; // Maximum number of retries
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
          const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: transcript }],
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );

          console.log("OpenAI Response:", openaiResponse.data); // Log the full response
          setResponse(openaiResponse.data.choices[0].message.content);
          setLoading(false);
          return; // Exit if successful

        } catch (error) {
          if (error.response && error.response.status === 429) {
            // If rate limit is hit, wait and retry
            attempt += 1;
            const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.warn(`Rate limit hit, retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          } else {
            console.error("Error fetching response from OpenAI:", error.response || error);
            setResponse("Sorry, I couldn't process that.");
            setLoading(false);
            return; // Exit on other errors
          }
        }
      }

      setResponse("Sorry, too many requests. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg transition-transform transform hover:scale-105 hover:shadow-xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Voice Assistant
        </h1>
        <p className="text-lg text-center mb-4 text-gray-600">
          Speak and get a response: {transcript}
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105"
            onClick={handleStart}
          >
            Start Listening
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-200 transform hover:scale-105"
            onClick={handleStop}
          >
            Stop Listening
          </button>
          <button
            className="border border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-200 transform hover:scale-105"
            onClick={resetTranscript}
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <div className="loader animate-spin h-10 w-10 border-4 border-t-4 border-white rounded-full"></div>
          </div>
        ) : (
          <h2 className="text-lg font-semibold text-center mt-4 text-gray-800">Response: {response}</h2>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
