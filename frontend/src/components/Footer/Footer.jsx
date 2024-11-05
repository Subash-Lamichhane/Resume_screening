import React from 'react'
import Navbar from '../Navbar/Navbar'

const Footer = () => {
  return (
<footer className="bg-white shadow  dark:bg-black h-24 flex justify-center items-center">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Resumatch. 
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="/verify" className="hover:underline me-4 md:me-6">Screen</a>
        </li>
        <li>
            <a href="/about" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="/help" className="hover:underline me-4 md:me-6">Help</a>
        </li>
    </ul>
    </div>
</footer>
  )
}

export default Footer