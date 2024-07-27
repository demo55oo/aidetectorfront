import React, { useState } from 'react';
import axios from 'axios';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const HumanizeTextComponent = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleHumanizeClick = async () => {
    try {
      const response = await axios.post('https://aidetectorendpoint-production.up.railway.app/humanize', { text: inputText });
      setOutputText(response.data.humanized_text);
    } catch (error) {
      console.error('Error:', error);
      setOutputText('An error occurred while humanizing the text.');
    }
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 rounded-2xl bg-white dark:bg-dark-primary ring-1 ring-gray-200 dark:ring-gray-500 shadow-lg">
      <div className="px-4 py-4 border-b dark:border-gray-500">
        <div className="flex items-center">
          <span className="relative flex mr-2 h-3 w-3">
            <span className="bg-green-400 absolute inline-flex transition h-full w-full rounded-full opacity-75"></span>
            <span className="bg-green-500/50 relative inline-flex transition rounded-full h-3 w-3"></span>
          </span>
          <p className="font-medium">
            {inputText ? `Input provided: ${countWords(inputText)} words` : 'Waiting for your input...'}
          </p>
        </div>
      </div>
      <div className="lg:flex gap-4">
        <div className="lg:flex lg:flex-col flex-1 px-4 py-4 bg-white rounded-lg">
          <textarea
            className="w-full h-[30rem] p-4 border border-gray-300 rounded-lg  bg-white  text-black dark:text-black resize-none"
            placeholder="To rewrite or check your content, type or paste it here and click on the buttons below."
            spellCheck="false"
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
          <div className="flex justify-between items-center mt-2 bg-white rounded-b-lg p-3">
            <p className="font-medium text-base">
              {countWords(inputText)}/800 Words
            </p>
            <div className="flex space-x-2">
              <button
                type="button"
                className="flex items-center bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
                onClick={handleHumanizeClick}
              >
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                Humanize
              </button>
              <button
                type="button"
                className="flex items-center bg-transparent border border-gray-300 text-gray-500 rounded-lg px-4 py-2  transition"
              >
                <i className="fas fa-flag mr-2"></i> Check for AI
              </button>
            </div>
          </div>
        </div>
        <div className="w-1 bg-white"></div>
        <div className="lg:flex lg:flex-col flex-1 px-4 py-4">
          <textarea
            value={outputText}
            readOnly
            className="w-full h-[30rem] p-4 border border-gray-300 rounded-lg bg-white  text-black dark:text-black"
          />
          <div className="flex justify-between items-center mt-2 bg-white dark:bg-dark-primary rounded-b-lg p-3">
            <p className="font-medium">{countWords(outputText)} Words</p>
            <div className="flex space-x-4">
              <a
                aria-label="Expand humanizer size"
                className="text-gray-500 dark:text-gray-200 hover:text-blue-500 transition"
                href="/dashboard/humanizer"
              >
                <i className="fad fa-xl fa-expand"></i>
              </a>
              <button
                type="button"
                aria-label="Copy Output"
                className="text-gray-500 dark:text-gray-200 hover:text-blue-500 transition"
              >
                <i className="fad fa-xl fa-copy"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanizeTextComponent;
