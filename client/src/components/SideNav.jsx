import React from 'react';
import '../styles/SideNav.css';
import { SideNavData } from './SideNavData';

const SideNav = () => {

    console.log(SideNavData);
    return (
        <div className='sideNav'>
            <ul className = 'sideNavList'>
                {SideNavData.map((val, key) => {
                    return (
                        <li key={key} className = 'row'>{val.page}</li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideNav;