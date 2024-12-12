import React from 'react';
import '../styles/SideNav.css';
import { useNavigate } from 'react-router-dom'

const SideNav = () => {
    const navigate = useNavigate();
    return (
        <div className='sideNav'>
            <ul className = 'sideNavList'>
                <li className='row' onClick={() => {navigate('/')}}>Home</li>
                <li className='row' onClick={() => {navigate('/SavedPage')}}>Pinned</li>
            </ul>
        </div>
    );
};

export default SideNav;