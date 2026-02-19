import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AuthorProfile() {
  return (
    <div className="author-profile p-3">
      {/* Navigation */}
      <ul className="nav justify-content-center mb-4 glass-effect p-3 rounded-pill gap-4 d-inline-flex mx-auto position-relative start-50 translate-middle-x">
        <li className="nav-item">
          <NavLink
            to='articles'
            className={({ isActive }) =>
              `nav-link fs-5 px-4 rounded-pill transition-all ${isActive ? 'bg-primary text-white shadow' : 'text-muted hover-text-primary'}`
            }
          >
            My Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to='article'
            className={({ isActive }) =>
              `nav-link fs-5 px-4 rounded-pill transition-all ${isActive ? 'bg-primary text-white shadow' : 'text-muted hover-text-primary'}`
            }
          >
            Post New
          </NavLink>
        </li>
      </ul>

      {/* Content Area */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthorProfile;