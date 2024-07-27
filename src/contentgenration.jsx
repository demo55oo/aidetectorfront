import React, { useState } from 'react';
import axios from 'axios';

const AiOutlineGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [purpose, setPurpose] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [generatedOutline, setGeneratedOutline] = useState('');
  const [error, setError] = useState(null);

  const handleGenerateOutline = async () => {
    if (!prompt || !purpose || !wordCount) {
      setError('Please fill in all fields.');
      return;
    }

    // Prepare request data for OpenAI API
    const data = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: `Generate a ${purpose.toLowerCase()} with the following details: ${prompt}. The content should be around ${wordCount} words.`
        }
      ]
    };

    try {
      // Make the request to OpenAI API
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-F9kHB50QRv2e5lVBzZpwT3BlbkFJleRrLG7NjN4VBUa0HUMO`
          }
        }
      );

      // Update the state with the generated outline
      setGeneratedOutline(response.data.choices[0].message.content);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while generating the outline.');
    }
  };

  return (
    <div className="mx-auto max-w-6xl pb-16 mt-8 min-h-[70vh] px-7">
      <div className="space-y-8">
        {/* Prompt Section */}
        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="prompt" className="block text-sm font-medium leading-6 text-gray-500">
              Please briefly describe your prompt <span className="text-red-500">*</span>
            </label>
            <div className="space-x-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-600/5 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-500 ring-1 ring-inset ring-blue-500/10">
                <i className="fas fa-pencil mr-2"></i>Available Generations: 5
              </span>
              <span className="bg-gray-50 dark:bg-gray-400/5 text-gray-500 dark:text-gray-400 ring-gray-500/10 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                <i className="fas fa-info-circle mr-2"></i>0/100 words
              </span>
            </div>
          </div>
          <div className="mt-2">
            <textarea
              id="prompt"
              rows="11"
              className="block  dark:ring-gray-500/20 focus:dark:ring-blue-600 disabled:dark:bg-gray-700/10 disabled:bg-gray-100 resize-none w-full transition rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              placeholder="Tell us what your content is about..."
              spellCheck="false"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>

        {/* Purpose Section */}
        <div>
          <span className="block text-sm font-medium leading-6 text-gray-500">
            Select writing purpose <span className="text-red-500">*</span>
          </span>
          <div className="relative mt-2">
            <select
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="block w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 transition focus:ring-blue-500 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>Select a purpose</option>
              <option value="Essay">Essay</option>
              <option value="Letter">Letter</option>
              <option value="Email">Email</option>
            </select>
          </div>
        </div>

        {/* Word Count Section */}
        <div>
          <label htmlFor="wordCount" className="text-sm mr-2 font-medium text-gray-500">
            Word count <span className="text-red-500">*</span>
          </label>
          <div className="mt-2">
            <input
              id="wordCount"
              type="number"
              className="block w-full disabled:bg-gray-100 dark:bg-dark-primary dark:ring-gray-500/20 focus:dark:ring-blue-600 disabled:dark:bg-gray-700/10 rounded-md border-0 py-1.5 transition shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Enter word count"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Minimum 350 words, maximum 500 words.
          </p>
        </div>

        {/* Generate Button and History Link */}
        <div>
          <button
            type="button"
            onClick={handleGenerateOutline}
            className="inline-flex items-center w-full justify-center gap-x-2 rounded-md bg-blue-600 transition px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <i className="fas fa-sparkles"></i>Generate Outline
          </button>
          <a className="text-center font-medium mt-3 text-gray-500 hover:text-gray-400 transition text-sm flex justify-center items-center" href="/dashboard/documents">
            <i className="fas fa-history mr-2"></i>Looking for your history?
          </a>
        </div>
        
        {/* Error and Generated Outline Display */}
        {error && <p className="text-red-600">{error}</p>}
        {generatedOutline && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Generated Outline</h3>
            <p>{generatedOutline}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiOutlineGenerator;
