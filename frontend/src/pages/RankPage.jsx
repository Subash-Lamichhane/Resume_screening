import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import FileIcon from '../images/fileIcon.png';
import PredictionResults from '../components/Screener/PredictionResults';

export default function RankPage() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [degree, setDegree] = useState('');
    const [major, setMajor] = useState('');
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState('');
    const [skillInput, setSkillInput] = useState('');

    const handleSkillAdd = () => {
        if (skillInput && !skills.includes(skillInput)) {
            setSkills([...skills, skillInput]);
            setSkillInput('');
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
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

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            className="bg-green-500 text-white px-6 py-3 rounded-lg"
                            onClick={() => {
                                // Handle submit logic here
                                console.log({
                                    jobTitle,
                                    jobDescription,
                                    degree,
                                    major,
                                    skills,
                                    experience
                                });
                            }}
                        >
                            Submit Job Description
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}