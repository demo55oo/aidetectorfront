import React, { useState } from 'react';
import axios from 'axios';
import {
  FlagIcon,
 
} from '@heroicons/react/24/solid'
const AiChecker = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCheckForAi = async () => {
    let data = JSON.stringify({
      text: text,
      model: 'Naive Bayes',
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://aidetectorendpoint-production.up.railway.app/detect',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      setResponse(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponse(null);
    }
  };

  const getCircularProgressStyle = (percentage) => {
    const strokeDasharray = 282.743; // 2 * Math.PI * radius (radius = 45)
    const strokeDashoffset = strokeDasharray * ((100 - percentage) / 100);
    return {
      strokeDasharray: `${strokeDasharray}px, ${strokeDasharray}px`,
      strokeDashoffset: `${strokeDashoffset}px`,
    };
  };

  return (
    <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto rounded-2xl mt-5 p-6 bg-white dark:bg-dark-primary ring-1 dark:ring-gray-500/20 ring-gray-200 shadow-lg pr-6">
      <textarea
        className="w-full mt-4 h-80 p-4 border-none rounded-lg resize-none bg-white ring-gray-400 focus:ring-blue-600 transition ring-1 focus:ring-opacity-50 dark:bg-dark-primary dark:ring-gray-500/20 focus:outline-none"
        placeholder="To check your content, type or paste it here and click on the button below."
        spellCheck="false"
        value={text}
        onChange={handleTextChange}
      />
      <button
        type="button"
        className="rounded-lg flex items-center bg-blue-500 disabled:bg-blue-800 disabled:bg-opacity-100 shadow-lg shadow-blue-500/50 px-5 py-2.5 font-semibold text-white hover:bg-blue-600 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={handleCheckForAi}
      >
        <i className="fas fa-flag mr-2"></i>
        <FlagIcon className="w-5 h-5 mr-2" />
        Check for AI
      </button>
      
      {response && (
        <div className="mt-4">
          <div className="flex justify-center items-center space-x-8">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 100 100" className="absolute top-0 left-0">
                <path
                  className="CircularProgressbar-trail"
                  d="
                    M 50,50
                    m 0,-45
                    a 45,45 0 1 1 0,90
                    a 45,45 0 1 1 0,-90
                  "
                  strokeWidth="10"
                  fillOpacity="0"
                  className="text-gray-300"
                ></path>
                <path
                  className="CircularProgressbar-path"
                  d="
                    M 50,50
                    m 0,-45
                    a 45,45 0 1 1 0,90
                    a 45,45 0 1 1 0,-90
                  "
                  strokeWidth="10"
                  fillOpacity="0"
                  style={{
                    stroke: '#f76568',
                    ...getCircularProgressStyle(response['AI-generated']),
                  }}
                ></path>
                <text
                  className="CircularProgressbar-text"
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-f76568 text-lg"
                >
                  {response['AI-generated']}%
                </text>
              </svg>
            </div>
            <div className="text-center">
              <p className="font-medium">
                Your text is likely to be written <span className="font-bold text-red-600">by AI.</span>
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p>
              <span className="font-bold text-red-600">{response['AI-generated']}%</span> AI-generated
            </p>
            <p>
              <span className="font-bold text-green-600">{response['Human-written']}%</span> Human-written
            </p>
          </div>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 border border-red-600 rounded-md text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default AiChecker;
