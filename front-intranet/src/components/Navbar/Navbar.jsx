import React from 'react';
import { ImHome3 } from "react-icons/im";
import { FaUniversity, FaRocket } from "react-icons/fa";
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar__items'>
        <ul>
          <li className='navbar__items-item1'><ImHome3/></li>
          <li className='navbar__items-item2'><FaUniversity/></li>
          <li className='navbar__items-item3'><FaRocket/></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar