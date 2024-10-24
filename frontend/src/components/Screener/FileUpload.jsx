import React, { useEffect, useState } from 'react';
import DocImg from '../../images/pdfLogo.png'

function FileUpload({ file }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const simulateUpload = () => {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + 10; // Simulating progress increment by 10% every 500ms
                });
            }, 500);
        };

        simulateUpload(); // Start the simulated upload process
    }, []);

    return (
        <div className='mb-4 flex items-center justify-center'>
          <div className='flex space-x-2 w-full max-w-xl'> {/* Ensure full width but limit max size */}
            <div>
              <img src={DocImg} alt="Doc Img" className='w-8 h-8' />
            </div>
            <div className='flex-grow'> {/* Allow this section to grow and occupy space */}
              <div className='flex justify-between items-center space-x-4'>
                {/* Add flex-grow and min-width to the filename */}
                <span className='truncate flex-grow min-w-[100px]'>{file.name}</span> 
                <span>{progress}%</span>
              </div>
              <div className='w-full bg-gray-200 h-2 rounded'>
                <div className='bg-green-500 h-full rounded' style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default FileUpload;
