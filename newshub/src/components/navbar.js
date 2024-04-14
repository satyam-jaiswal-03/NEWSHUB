import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './profile';

function Navbar() {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
        <header className="p-3 bg-blue-600 flex ">
    <div className="container">
      <div className="flex flex-wrap align-items-center justify-content-center justify-content-lg-start ">

      
        <img className='h-10  pr-5' src="./newshub.svg" alt="" />

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
         
          <li><a href="#" className="nav-link px-2 text-white"></a></li>
          <li><a href="#" className="nav-link px-2 text-white">HOME</a></li>
          <li><a href="#" className="nav-link px-2 text-white">GLOBAL</a></li>
          <li><a href="#" className="nav-link px-2 text-white">INDIA</a></li>
          <li><a href="#" className="nav-link px-2 text-white">SPORTS</a></li>
          <li><a href="#" className="nav-link px-2 text-white">FINANCE</a></li>
          <li><a href="#" className="nav-link px-2 text-white">ENTERTAINMENT</a></li>
          <li><a href="#" className="nav-link px-2 text-white">POLITICS</a></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" className="form-control form-control-dark text-bg-light" placeholder="Search..." aria-label="Search"/>
        </form>

        <div className="text-end">
        
        {
          !isAuthenticated && 
          <button onClick={() => loginWithRedirect()} type="button" className="btn btn-outline-light me-2">Login</button>
        }
        {  isAuthenticated && 
      // <div className='rounded-lg w-3 h-5' >
      //   <img className='rounded-lg w-3' src={user.picture} alt={user.name} />
      //   <h2>{user.name}</h2>
      //   <p>{user.email}</p>
      // </div>
      <Profile/>
}
    
{/*          
          <button type="button" className="btn btn-warning">Sign-up</button> */}
        </div>
      </div>
    </div>
  </header>
      
    </div>
  )
}

export default Navbar
