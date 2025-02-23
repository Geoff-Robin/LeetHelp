import React, { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle'; // Ensure this path is correct
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
// Frosted Navbar Component with Theme Toggle
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100 font-Oswald">
          <Link to="/">LeetHelp</Link>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4 text-gray-900 dark:text-gray-100">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex px-7 h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-slate-950 py-1 text-sm font-medium dark:text-white backdrop-blur-3xl">
              <Link to="/">Back</Link>
            </span>
          </button>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

// Helper function to partition editorial data from the backend
const partitionEditorial = (data) => {
  console.log("Raw backend data:", data);
  if (data && data.solution) {
    const { understanding, approach, complexity, code, test_cases } = data.solution;
    return { understanding, approach, complexity, code, test_cases };
  }
  return data;
};

function Home() {
  const [problem, setProblem] = useState('');
  const [language, setLanguage] = useState('c++');
  const [editorial, setEditorial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper function to wait for ms milliseconds
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Call the backend /generate endpoint with retry logic for 500 errors
  const generateEditorial = async (attempt = 1, maxAttempts = 5) => {
    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, language })
      });

      if (!response.ok) {
        if (response.status === 500 && attempt < maxAttempts) {
          console.warn(`Attempt ${attempt} failed. Retrying...`);
          await wait(2000);
          return generateEditorial(attempt + 1, maxAttempts);
        } else {
          const errData = await response.json();
          throw new Error(errData.detail || "Something went wrong.");
        }
      }
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEditorial(null);
    try {
      const data = await generateEditorial();
      console.log("Received data:", data);
      const partitioned = partitionEditorial(data);
      setEditorial(partitioned);
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-20 p-8">
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">LeetCode Editorial Generator</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Generate detailed editorials for your LeetCode problems.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow mb-8">
          <div className="space-y-2">
            <label htmlFor="problem" className="block text-sm font-medium">
              Problem Description
            </label>
            <textarea
              id="problem"
              placeholder="Enter the problem description..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
              className="w-full p-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-400 resize-none"
              rows="5"
            ></textarea>
          </div>
          <div className="space-y-2">
            <label htmlFor="language" className="block text-sm font-medium">
              Programming Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-400"
            >
              <option value="c++">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Generating..." : "Generate Editorial"}
          </Button>
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        </form>
        {editorial && (
          <div className="space-y-8 bg-gray-100 dark:bg-gray-800 p-6 rounded shadow">
            {editorial.understanding && (
              <section>
                <h2 className="text-2xl font-bold border-b pb-2">Problem Explanation</h2>
                <p className="mt-2">{editorial.understanding}</p>
              </section>
            )}
            {editorial.approach && (
              <section>
                <h2 className="text-2xl font-bold border-b pb-2">Approach & Algorithm</h2>
                <p className="mt-2">{editorial.approach}</p>
              </section>
            )}
            {editorial.complexity && (
              <section>
                <h2 className="text-2xl font-bold border-b pb-2">Complexity</h2>
                <p className="mt-2"><strong>Time:</strong> {editorial.complexity.time || 'N/A'}</p>
                <p className="mt-2"><strong>Space:</strong> {editorial.complexity.space || 'N/A'}</p>
              </section>
            )}
            {editorial.code && (
              <section>
                <h2 className="text-2xl font-bold border-b pb-2">Code Implementation</h2>
                <pre className="mt-2 p-4 bg-gray-800 rounded overflow-x-auto text-sm">
                  {editorial.code}
                </pre>
              </section>
            )}
            {editorial.test_cases && (
              <section>
                <h2 className="text-2xl font-bold border-b pb-2">Test Cases</h2>
                <ul className="mt-2 list-disc pl-6">
                  {editorial.test_cases.map((test, idx) => (
                    <li key={idx}>{test.example}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
