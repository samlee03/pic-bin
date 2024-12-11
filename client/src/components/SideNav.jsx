import React from 'react';
import '../styles/SideNav.css';
import { SideNavData } from './SideNavData';

const SideNav = () => {

    console.log(SideNavData);
    return (
        <div className='sidenav'>
            <ul>
                {SideNavData.map((val, key) => {
                    return (
                        <li key={key}>{val.page}</li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SideNav;