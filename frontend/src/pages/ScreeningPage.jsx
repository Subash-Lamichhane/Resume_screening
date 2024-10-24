import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FileIcon from '../images/fileIcon.png';
import SideInfo from '../components/Screener/SideInfo';

function ScreeningPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.filter(file => file.type === 'application/pdf')); // Only allow PDFs
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files.filter(file => file.type === 'application/pdf')); // Only allow PDFs
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className='screen-container min-h-screen p-4'>
        <div className='p-4 flex justify-center text-4xl mb-12'>Screen the resumes</div>
        <div 
          className='bg-upload-outer h-72 flex items-center rounded-xl mx-auto w-10/12 p-2 mb-4'
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className='bg-upload-inner h-full w-full border-2 border-dotted border-white rounded-xl flex items-center justify-center'>
            <div className='flex flex-col items-center space-y-3 pt-6'>
              <img src={FileIcon} alt="fileicon" className='w-24' />
              <input 
                type="file" 
                id="fileUpload" 
                accept="application/pdf" 
                multiple 
                hidden 
                onChange={handleFileChange} 
              />
              <label htmlFor="fileUpload" className='p-4 rounded-none bg-white font-bold uppercase cursor-pointer'>
                Choose Files
              </label>
              <div className='text-white'>or drop files here</div>
            </div>
          </div>
        </div>
        
        {/* Display selected files */}
        {selectedFiles.length > 0 && (
          <div className='p-4 text-black'>
            <h2 className='text-lg'>Selected PDF Files:</h2>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex justify-center pt-6">
          <SideInfo />
        </div>
      </div>
    </div>
  );
}

export default ScreeningPage;
