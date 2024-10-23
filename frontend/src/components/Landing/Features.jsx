import React from 'react';
import Probability from '../../images/prob.png';
import Screening from '../../images/screen.png';
import Upload from '../../images/upload.png';

const Features = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-5xl font-bold mb-4">Features</h2>
        <p className="text-gray-600 mb-12 text-xl">Explore what  we can do for you</p>

        {/* Grid system for responsiveness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {/* Upload Resume Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4 p-8">
              <img src={Upload} alt="Career Icon" className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
            <p className="text-gray-600">Upload your resume for job categorization.</p>
          </div>

          {/* Resume Screening Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4 p-8">
              <img src={Screening} alt="Screening Icon" className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Resume Screening</h3>
            <p className="text-gray-600">Screen resumes based on the job requirements</p>
          </div>

          {/* Categorization Probability Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4 p-8">
              <img src={Probability} alt="Probability Icon" className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Categorization Probability</h3>
            <p className="text-gray-600">Probability percentage of job categories.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
