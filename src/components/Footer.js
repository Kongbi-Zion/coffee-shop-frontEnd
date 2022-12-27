import React from 'react'
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <main className='footer'>
       <div className='footer-top'>
         <div style={{maxWidth:"20rem"}}>
            <h3 className='footerTextHeading'><LocalCafeIcon style={{color:"#ce6d06", fontSize:"2.2rem"}}/> Coffee Shop</h3>
            <p className='secondryText'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            </p>
         </div> 
         <div>
            <h3 className='footerTextHeading'>Quick Links</h3>
                <ul className='secondryText'>
                    <li style={{paddingTop:"0rem"}}><Link style={{textDecoration:"none"}} to="" className='links'>Home</Link></li>
                    <li><Link style={{textDecoration:"none"}} to="" className='links'>About</Link></li>
                    <li><Link style={{textDecoration:"none"}} to="" className='links'>Services</Link></li>
                    <li><Link style={{textDecoration:"none"}} to="" className='links'>Contact</Link></li>
                </ul>
         </div>
         <div>
            <h3 className='footerTextHeading'>Get In Touch</h3>
            <ul className='secondryText'>
                <li style={{border: "none"}}>Address: Omnisport - Douala</li>
                <li style={{border: "none"}}>E-mail: kongbizion3@gmail.com</li>
                <li style={{border: "none"}}>Phone: (+237) 683 41 13 82</li>
            </ul>
         </div>
        
       </div>
       <div className='footer-bottom'>
        <p className='text-center'>© {(new Date().getFullYear())} Coffee Shop All Rights Reserved | By Kongbi Zion</p>
       </div>
    </main>
  )
}

export default Footer
