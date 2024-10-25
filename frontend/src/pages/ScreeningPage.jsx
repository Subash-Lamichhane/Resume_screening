import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FileIcon from '../images/fileIcon.png';
import SideInfo from '../components/Screener/SideInfo';
import FileUpload from '../components/Screener/FileUpload'; // Import the FileUpload component

function ScreeningPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [output, setOutput] = useState('');

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

  const handlePredict = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

    try {
      const response = await fetch('http://127.0.0.1:8000/model/predict/', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      setOutput('An error occurred while predicting categories.');
    }
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

        {selectedFiles.length > 0 && (
          <div className='p-4 text-black'>
            <h2 className='text-2xl mb-4 flex justify-center items-center '>Uploaded Files:</h2>
            {selectedFiles.map((file, index) => (
              <FileUpload key={index} file={file} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-6">
          <button 
            onClick={handlePredict} 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Predict
          </button>
        </div>

        {output && (
          <div className='p-4 text-black'>
            <h2 className='text-2xl mt-4'>Prediction Results:</h2>
            <pre className='bg-gray-100 p-4 rounded'>{output}</pre>
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
