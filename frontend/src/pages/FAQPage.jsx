import React, { useState } from 'react';
// import faqImage from '../assets/img/wonderingimg.png'
import faqImage from '../images/wonderingImg.png'
import Navbar from '../components/Navbar/Navbar';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
        <Navbar />
        <div className=" flex-row lg:flex p-8 pr-12 pl-12 rounded-lg bg-gray-50 self-center lg:mt-10">
            {/* Left side image and heading */}
            <div className="flex-1 mb-8 lg:mb-0 lg:mr-8 p-3 ">
                <h2 className="text-4xl font-bold mb-4 pb-4">You’re probably wondering...</h2>
                <img src={faqImage} alt="FAQ illustration" className="rounded-md mt-4" />
            </div>
            
            {/* Right side FAQ section */}
            <div className="flex-1 ">
                <h2 className=" text-2xl lg:text-4xl font-bold mb-6 p-3 pb-4">Frequently Asked Questions</h2>
                <div>
                    {faqData.map((faq, index) => (
                        <div key={index} className="mb-4 lg:text-xl">
                            <button
                                className="w-full text-left font-semibold text-gray-900 py-2 border-b flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                                <span>{activeIndex === index ? '-' : '+'}</span>
                            </button>
                            {activeIndex === index && (
                                <div className="py-2 text-gray-700">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
                    </>
    );
}

const faqData = [
    {
        question: 'How does the resume upload feature work?',
        answer: 'Simply upload your resume, and our system will analyze it to categorize your skills and match you with relevant job opportunities based on your experience.'
    },
    {
        question: 'What happens during the resume screening process?',
        answer: 'Our advanced algorithms screen resumes by evaluating the skills, qualifications, and experience listed, ensuring a precise match with job requirements.'
    },
    {
        question: 'How accurate is the job categorization probability?',
        answer: 'The categorization probability indicates the likelihood of your resume matching specific job categories. Our platform uses AI to ensure a high level of accuracy.'
    },
    {
        question: 'Can I get personalized job recommendations?',
        answer: 'Yes, based on your resume and skills, we provide personalized job recommendations tailored to your qualifications and interests.'
    }
];

