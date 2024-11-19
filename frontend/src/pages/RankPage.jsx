import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FileIcon from '../images/fileIcon.png';
import FileUpload from '../components/Screener/FileUpload';

export default function RankPage() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [results, setResults] = useState([]); // Store ranked results here
    const [loading, setLoading] = useState(false); // Loading indicator

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files.filter(file => file.type === 'application/pdf'));
    };

    const handleSkillAdd = () => {
        if (skillInput && !skills.includes(skillInput)) {
            setSkills([...skills, skillInput]);
            setSkillInput('');
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        // Append form fields to FormData
        formData.append('jobTitle', jobTitle);
        formData.append('jobDescription', jobDescription);
        formData.append('degree', degree);
        formData.append('major', major);
        formData.append('experience', experience);
        formData.append('skills', JSON.stringify(skills));

        // Append files to FormData
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/upload_resume', {
                method: 'POST',
                body: formData,
            });
            // console.log(response)
            if (response.ok) {
                const result = await response.json();
                console.log(result)
                setResults(result.results || []); // Assuming `rankedResumes` is part of the API response
            } else {
                console.error('Error with the request:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='screen-container min-h-screen p-4 bg-gray-100'>
                <div className='p-4 flex justify-center text-4xl mb-8 text-gray-800'>Job Description</div>

                <div className="job-form bg-white shadow-lg text-gray-800 p-6 rounded-lg max-w-xl mx-auto">
                    {/* Job Title */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Job Title</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded border border-gray-300"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g., Full Stack Developer"
                        />
                    </div>

                    {/* Job Description */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Job Description</label>
                        <textarea
                            className="w-full p-2 rounded border border-gray-300"
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Enter job description"
                            rows="4"
                        />
                    </div>

                    <div className="flex gap-4">
                        {/* Degree */}
                        <div className="mb-4 flex-grow">
                            <label className="block text-lg font-medium mb-2">Degree</label>
                            <select
                                className="w-full p-2 rounded border border-gray-300"
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            >
                                <option value="">Select Degree</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                                <option value="PhD">PhD</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                        {/* Major */}
                        <div className="mb-4 flex-grow">
                            <label className="block text-lg font-medium mb-2">Major</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded border border-gray-300"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                placeholder="e.g., Computer Engineering"
                            />
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Skills</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                className="w-full p-2 rounded border border-gray-300"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && skillInput.trim() !== '') {
                                        handleSkillAdd();
                                        e.preventDefault();  // Prevent form submission if inside a form
                                    }
                                }}
                                placeholder="Type a skill and press Add"
                            />
                            <button
                                onClick={handleSkillAdd}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 p-2 rounded mr-2 mb-2 flex items-center space-x-1"
                                >
                                    {skill}
                                    <button
                                        onClick={() => handleSkillRemove(skill)}
                                        className="text-red-400 font-bold ml-2"
                                    >
                                        X
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience in Years */}
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">Experience (Years)</label>
                        <input
                            type="number"
                            className="w-full p-2 rounded border border-gray-300"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Enter required experience in years"
                        />
                    </div>

                    <div className='bg-upload-inner h-full w-full border-2 border-dotted border-white rounded-xl flex items-center justify-center'>
                        <div className='flex flex-col items-center space-y-3 p-4'>
                            <img src={FileIcon} alt="fileicon" className='w-20' />
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

                    {selectedFiles.length > 0 && (
                        <div className='p-4 text-black'>
                            <h2 className='text-2xl mb-4 flex justify-center items-center '>Uploaded Files:</h2>
                            {selectedFiles.map((file, index) => (
                                <FileUpload key={index} file={file} />
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center m-3">
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-lg"
                            onClick={handleSubmit}
                        >
                            {loading ? 'Ranking...' : 'Rank Resume'}
                        </button>
                    </div>
                </div>
                {results && (
                    <div className="results-section mt-6 bg-white shadow-lg p-6 rounded-lg max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">Resume Results</h2>
                        <ul>
                            {Object.entries(results).map(([fileName, fileData], index) => (
                                <li
                                    key={index}
                                    className="border-b last:border-b-0 py-2"
                                >
                                    <strong>{fileName}</strong>
                                    <div className="text-sm text-gray-700">
                                        {
                                            fileData.error ? (
                                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                                    <strong className="font-bold">Error:</strong> {fileData.error}
                                                </div>
                                            ) : (
                                                <div className="bg-white rounded-lg p-6">
                                                    {/* Header with total score */}
                                                    <div className="text-center mb-4">
                                                        <div className="text-2xl font-bold text-gray-800">
                                                            Score: {(
                                                                (parseFloat(fileData.cosine_similarity_score) +
                                                                    parseFloat(fileData.skills_score) +
                                                                    parseFloat(fileData.degree_score)) /
                                                                3
                                                            ).toFixed(2)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">Overall Average Score</div>
                                                    </div>
                                                    {/* Individual Scores */}
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center border-b pb-2">
                                                            <span className="font-medium text-gray-600">Description Match Score</span>
                                                            <span className="text-gray-900">{fileData.cosine_similarity_score}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center border-b pb-2">
                                                            <span className="font-medium text-gray-600">Skill Score</span>
                                                            <span className="text-gray-900">{fileData.skills_score}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center border-b pb-2">
                                                            <span className="font-medium text-gray-600">Degree Score</span>
                                                            <span className="text-gray-900">{fileData.degree_score}</span>
                                                        </div>
                                                        <div className="mt-6">
                                                            <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-700">Extracted Skills</h3>
                                                                    <p className="text-gray-600">{fileData.info.SKILLS.join(', ')}</p>
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-700">Soft Skills</h3>
                                                                    <p className="text-gray-600">
                                                                        {fileData.info["Soft Skills"].length > 0
                                                                            ? fileData.info["Soft Skills"].join(', ')
                                                                            : "Not provided"}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-700">Degree</h3>
                                                                    <p className="text-gray-600">
                                                                        {fileData.info.Degree.length > 0
                                                                            ? fileData.info.Degree.join(', ')
                                                                            : "Not provided"}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-semibold text-gray-700">Major</h3>
                                                                    <p className="text-gray-600">
                                                                        {fileData.info.Major.length > 0
                                                                            ? fileData.info.Major.join(', ')
                                                                            : "Not provided"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
