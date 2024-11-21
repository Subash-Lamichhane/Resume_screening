import React, { useState } from 'react';
import { GiHamburgerMenu as Hamburger } from 'react-icons/gi';
import { ImCross as Close } from 'react-icons/im';
import { Link } from 'react-router-dom';
import LogoImg from '../../images/logo.png';

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
  <nav className={`flex p-2 bg-transparent  justify-evenly md:justify-around space-x-6  items-center font-semibold px-4 ${burgerOn ? 'mb-32' : 'mb-4'}`}>
    <div className='flex items-center text-md md:text-xl space-x-2'>
      <Link to='/'>
        <img src={LogoImg} alt="App logo" className='w-8 md:w-16' />
      </Link>
      <div>Resumatch</div>
    </div>

    {/* Desktop Menu */}
<div className="max-md:hidden md:block justify-end text-lg space-x-8">
  <Link to="/" className="cursor-pointer hover:text-gray-600">Home</Link>
  {/* <Link to="/screen" className='cursor-pointer hover:text-gray-600'>Screen</Link> */}
  <Link to="/based-on-job-description" className='cursor-pointer hover:text-gray-600'>Screen</Link>

  <Link to="/faq" className="cursor-pointer hover:text-gray-600">FAQ</Link>
</div>

    {/* Mobile Menu Container */}
    <div className='lg:hidden'>
      {/* Hamburger Menu Button */}
      <button className='md:hidden p-6' onClick={burgerClicked}>
        {!burgerOn ? <Hamburger className='w-6 h-6' /> : <Close className='w-6 h-6' />}
      </button>

      {/* Mobile Menu */}
      {burgerOn && (
        <div className='absolute top-8 right-0 w-full m-4 bg-primary p-4 shadow-lg z-20 md:hidden'>
          <Link to="/" className="block text-center py-2 text-sm text-gray-700" onClick={burgerClicked}>Home</Link>
          {/* <Link to="/screen" className="block text-center py-2 text-sm text-gray-700" onClick={burgerClicked}>Screen</Link> */}
          <Link to="/based-on-job-description" className="block text-center py-2 text-sm text-gray-700" onClick={burgerClicked}>Screen</Link>

          <Link to="/faq" className="block text-center py-2 text-sm text-gray-700" onClick={burgerClicked}>FAQ</Link>
        </div>
      )}
    </div>
  </nav>
);
}
