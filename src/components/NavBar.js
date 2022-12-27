import React from 'react'
import { Link } from 'react-router-dom'
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function NavBar(props) {
    function smoothScroll(){
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    }
  return (
        <nav id="myNav" className="navbar navbar-expand-lg navbar-dark fixed-top sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <LocalCafeIcon style={{color:"#ce6d06"}}/> Coffee Shop
                </Link>
                <button style={{outline:'none', boxShadow:"none", border:"none"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse"></div>
    
                <div  className="collapse navbar-collapse navbarCollapse" id="navbarNavDropdown" >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/about' className="nav-link">About</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/services' className="nav-link">Services</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/contact' className="nav-link">Contact</Link>
                        </li>
                    </ul>
                </div>
               <div className='navIcons'>
                <span style={{marginRight:"2rem"}}><PersonIcon/></span>
                <span style={{marginRight:"2rem"}}><ShoppingCartIcon/></span>
                <button className='orderBtn'>Order Now</button>
               </div>
            </div>
        </nav>
  )
}

export default NavBar
