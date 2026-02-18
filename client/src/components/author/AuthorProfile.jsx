import React from 'react'
import { NavLink, Outlet } from 'react-router-dom' // Fixed typo

function authorProfile() {
  return (
    <div>
      <ul className='d-flex justify-content-around list-unstyled fs-3'>
        <li className="nav-item">
          <NavLink to='articles'>Articles</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='article'>Post Article</NavLink>
        </li>
      </ul>

      <div>
        <Outlet /> 
      </div>
    </div>
  )
}

export default authorProfile