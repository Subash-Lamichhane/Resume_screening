import React from 'react'
import heroImage from '../../images/heroImg.jpg'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-center relative min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center lg:scale-100 "
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-center h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] max-w-xl">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8 md:px-32 self-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              ResuMatch
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-md">
              Automated resume screening that matches resumes to job titles and provides compatibility scores.
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <Link to='/screen'>
                <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-white 
                  border border-white hover:bg-white/20 transition-colors duration-300 
                  rounded-md shadow-lg hover:shadow-xl">
                  Submit Your Resume
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection  