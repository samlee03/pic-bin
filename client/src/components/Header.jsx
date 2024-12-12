import React from 'react'
import "../styles/Header.css"
import Logo from "../assets/logo_pic_bin.png"
const Header = () => {
  return (
    <div className='Header'>
      <img className='logo' src={Logo}/>
    </div>
  )
}

export default Header