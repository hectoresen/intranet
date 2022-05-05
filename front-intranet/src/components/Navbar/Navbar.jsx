import React from 'react';
import { ImHome3 } from "react-icons/im";
import { FaUniversity, FaRocket } from "react-icons/fa";
import { BsChatText } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const navHome = () => navigate('/home');
  const navNews = () => navigate('/home/news');
  const navProjects = () => navigate('/home/projects');
  const navChat = () => navigate('/home/chat');

  return (
    <div className='navbar'>
      <div className='navbar__items'>
        <ul>
          <li className='navbar__items-item1' onClick={navHome}><ImHome3/></li>
          <li className='navbar__items-item2' onClick={navNews}><FaUniversity/></li>
          <li className='navbar__items-item3' onClick={navProjects}><FaRocket/></li>
          <li className='navbar__items-item3' onClick={navChat}><BsChatText/></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar