import React, { useEffect, useState } from 'react';
import DocImg from '../../images/pdfLogo.png';

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
                    return prevProgress + 10;
                });
            }, 500);
        };

        simulateUpload();
    }, []);

    // Function to preview the file in a new tab
    const handlePreview = () => {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
    };

    return (
        <div className='mb-4 flex items-center justify-center'>
            <div className='flex space-x-2 w-full max-w-xl'>
                <div>
                    <img src={DocImg} alt="Document" className='w-8 h-8' />
                </div>
                <div className='flex-grow'>
                    <div className='flex justify-between items-center space-x-4'>
                        <span className='truncate flex-grow min-w-[100px]'>{file.name}</span>
                        <span>{progress}%</span>
                        {progress === 100 && (
                            <button 
                                onClick={handlePreview} 
                                className='text-blue-500 underline hover:text-blue-700'>
                                Preview
                            </button>
                        )}
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
