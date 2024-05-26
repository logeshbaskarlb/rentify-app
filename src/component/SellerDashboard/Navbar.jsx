import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar fixed top-0 left-0 right-0 bg-gray-900 p-4">
    <div className="navbar-buttons flex justify-end">
      <Link to="/seller/dashboard" className="text-white mr-4 hover:text-gray-300">Add Site</Link>
      <Link to="/seller/profile" className="text-white hover:text-gray-300">Profile</Link>
    </div>
  </div>
  )
}

export default Navbar
