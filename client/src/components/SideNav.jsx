import React from 'react';
import '../styles/SideNav.css';
import { useNavigate } from 'react-router-dom'
import { SideNavData } from './SideNavData';

const SideNav = () => {
    const navigate = useNavigate();
    // console.log(SideNavData);
    return (
        <div className='sideNav'>
            {/* <ul className = 'sideNavList'>
                {SideNavData.map((val, key) => {
                    return (
                        <li key={key} className = 'row'>{val.page}</li>
                    );
                })}
            </ul> */}
            <ul className = 'sideNavList'>
                <li className='row' onClick={() => {navigate('/')}}>Home</li>
                <li className='row' onClick={() => {navigate('/SavedPage')}}>Pinned</li>
            </ul>
        </div>
    );
};

export default SideNav;