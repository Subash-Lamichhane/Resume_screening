import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import FileIcon from '../images/fileIcon.png';

function ScreeningPage() {
  return (
    <div>
      <Navbar />
      <div className='screen-container p-4'>
        <div className='p-4 flex justify-center text-4xl mb-12'>Screen the resumes</div>
        <div className='bg-upload-outer h-72 flex items-center rounded-xl mx-auto w-10/12 p-2'>
          <div className='bg-upload-inner h-full w-full border-2 border-dotted border-white rounded-xl flex items-center justify-center'>
            <div className='flex flex-col items-center space-y-3 pt-6'>
              <img src={FileIcon} alt="fileicon" className='w-24' />
              <button className='p-4 rounded-none bg-white font-bold uppercase'>Choose Files</button>
              <div className='text-white'>or drop files here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreeningPage;
