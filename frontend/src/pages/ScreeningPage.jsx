import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FileIcon from '../images/fileIcon.png';
import SideInfo from '../components/Screener/SideInfo';
import FileUpload from '../components/Screener/FileUpload'; 
import PredictionResults from '../components/Screener/PredictionResults';
import CategorySelector from '../components/Screener/CategorySelector';

function ScreeningPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [output, setOutput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [requiredCategory, setRequiredCategory] = useState(''); // New state
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.filter(file => file.type === 'application/pdf')); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files.filter(file => file.type === 'application/pdf')); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePredict = async () => {
    setLoading(true); // Start loading
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

    try {
      const response = await fetch('http://127.0.0.1:8000/model/predict/', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      setOutput(JSON.stringify(result, null, 2));
      setRequiredCategory(selectedCategory); // Update required category only when screen button is pressed
    } catch (error) {
      setOutput('An error occurred while predicting categories.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <Navbar />
      
      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="h-16 w-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
      
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
        <div>
          <CategorySelector onSelectCategory={handleCategorySelect} />
        </div>

        <div className="flex justify-center pt-6">
          <button 
            onClick={handlePredict} 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Screen
          </button>
        </div>

        {output && <PredictionResults output={output} required_category={requiredCategory} />}

        <div className="flex justify-center pt-6">
          <SideInfo />
        </div>
      </div>
    </div>
  );
}

export default ScreeningPage;
