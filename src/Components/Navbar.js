import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
 const navigate= useNavigate();

  const toggleDropdown = () => {

    setDropdownOpen(!dropdownOpen);

  };

  const registerUser=()=>{
    navigate('/admin')
    
}
 

  const closeDropdown = () => {

    setDropdownOpen(false);

  };

 const logout= () =>{

    navigate('/')

 }

 const resetpassword= () =>{

  navigate('/reset')

}

  return (

    <nav className="bg-white text-black">

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

        <div className="relative flex h-16 items-center justify-between">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            {/* Mobile menu button */}

            <button

              type="button"

              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"

              aria-controls="mobile-menu"

              aria-expanded="false"

            >

              <span className="sr-only">Open main menu</span>

              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">

                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />

              </svg>

              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">

                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />

              </svg>

            </button>

          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

            <div className="flex flex-shrink-0 items-center">

              <img

                className="h-16 w-28"

                src="/logo.jpg"

                alt="Your Company"

              />

            </div>

          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {location.pathname === '/admin1' && (
              <button
                onClick={registerUser}
                className="mr-3 p-1 rounded-lg bg-white font-bold text-green-500 hover:bg-green-50 mb-5 h-[37px] w-[180px] border-3 border-green-600"
              >
                Register new User
              </button>
            )}

            {/* Profile dropdown */}

            <div className="relative ml-3">

              <div>

                <button

                  type="button"

                  className="relative mb-5 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"

                  id="user-menu-button"

                  aria-expanded={dropdownOpen}

                  aria-haspopup="true"

                  onClick={toggleDropdown}

                >

                  <span className="sr-only">Open user menu</span>

                  <img

                    className="h-5 w-10  rounded-full"

                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

                    alt=""

                  />

                </button>

              </div>

 

              {/* Dropdown menu */}

              {dropdownOpen && (

                <div

                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"

                  role="menu"

                  aria-orientation="vertical"

                  aria-labelledby="user-menu-button"

                  tabIndex="-1"

                >

                  <a

                   onClick={logout}

                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer "

                    role="menuitem"

                    tabIndex="-1"

                    id="user-menu-item-2"

                  >

                    Sign out

                  </a>

                  <a

                   onClick={resetpassword}

                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer "

                    role="menuitem"

                    tabIndex="-1"

                    id="user-menu-item-2"

                  >

                    Change Password

                  </a>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </nav>

  );

};

export default Navbar;