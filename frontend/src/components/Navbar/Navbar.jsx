import React, { useState, useEffect } from 'react'
// import { Link, Router } from "react-router-dom";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";
import { ImCross as Close } from "react-icons/im";
import { Link } from 'react-router-dom';
import LogoImg  from '../../images/logo.png';

// import Hamburger from './Hamburger';
// import Close from './Close';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOn, setBurger] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const burgerClicked = () => {
    setBurger(!burgerOn);
  };

  return (
    <nav className={`flex p-4 justify-between md:justify-around space-x-6 bg-primary items-center font-semibold px-8 ${burgerOn ? 'mb-32' : 'mb-8'}`}>
        <div className='items-center flex text-md md:text-xl space-x-2 '>
            <Link to='/'>
            <img src={LogoImg} alt="App logo" className='w-8 md:w-16 '/>
            </Link>
            <div>Resumatch</div>
        </div>
<div className='md:mx-16'>
    
          {/* Desktop Menu */}
          <div className='hidden md:p-6 md:flex md:justify-end text-lg  md:space-x-8'>
            <Link to="/"  className="cursor-pointer hover:text-gray-600">Home</Link>
            <Link to="/verify" className='cursor-pointer hover:text-gray-600'>Screen</Link>
            <Link to="/about"  className="cursor-pointer hover:text-gray-600">About</Link>
            <Link to="/help"  className="cursor-pointer hover:text-gray-600">FAQ</Link>
          </div>
    
          {/* Hamburger Menu Button */}
          <button className='md:hidden p-6' onClick={burgerClicked}>
            {!burgerOn ? <Hamburger className='w-6 h-6'/> : <Close/>}
            </button>
    
          {/* Mobile Menu */}
          {burgerOn && (
            <div className='absolute top-16 right-0 w-full  bg-primary p-4 shadow-lg z-20 md:hidden'>
              <Link to="hero" smooth={true} duration={700} className=" block text-center py-2 text-sm text-gray-700 " onClick={burgerClicked}>Home</Link>
              <Link to="about" smooth={true} duration={700} className=" block text-center px-8 py-2 text-sm text-gray-700 " onClick={burgerClicked}>About</Link>
              <Link to="contact" smooth={true} duration={700} className=" block text-center px-8 py-2 text-sm text-gray-700 " onClick={burgerClicked}>Contact</Link>
              <Link to="subjectmaterials"  className=" block text-center px-8 py-2 text-sm text-gray-700 " onClick={burgerClicked}>Subject Materials</Link>
    
              {/* Subject Materials dropdown in mobile menu */}
    
    
            </div>
          )}
</div>
    </nav>
  );
}

