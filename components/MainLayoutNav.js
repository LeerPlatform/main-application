import { useState } from 'react'
import Link from 'next/link'
import onClickOutside from 'react-onclickoutside'
import { authenticationService, userService } from '../services'

function MainLayoutNav() {
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false)
  const toggleProfileDropdown = () => setOpenProfileDropdown(!openProfileDropdown)

  const isAuthenticated = true;

  MainLayoutNav.handleClickOutside = () => setOpenProfileDropdown(false)

  return (
    <nav className="bg-white shadow relative z-40 border-t-4 border-primary-blue">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center">

              <Link href="/">
                <a className="flex flex-row items-center pr-3">
                  <img src="/images/logo-icon-transparent-150x144.png" className="h-8 lg:h-12" alt="Leer Platform Logo" />
                </a>
              </Link>

              <Link href="/catalog">
                <a className="flex flex-row items-center px-2 lg:px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Catalogus
                </a>
              </Link>

              <Link href="/topics">
                <a className="flex flex-row items-center px-2 lg:px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Onderwerpen
                </a>
              </Link>

              <Link href="/news">
                <a className="flex flex-row items-center px-2 lg:px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Nieuws
                </a>
              </Link>

              <Link href="/leaderbord">
                <a className="flex flex-row items-center px-2 lg:px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Leaderbord
                </a>
              </Link>

            </div>
          </div>

          {!isAuthenticated &&
            <div className="flex items-center">
              <Link href="/login">
                <a className="flex flex-row items-center px-2 lg:px-4 py-2 mr-2 hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Log In
                </a>
              </Link>

              <Link href="/register">
                <a className="flex flex-row items-center px-2 lg:px-4 py-2 border-2 border-primary-blue rounded-full hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Get Started
                </a>
              </Link>
            </div>
          }

          {isAuthenticated &&
            <div className="flex items-center ml-2">
              <div className="relative ml-3">
                <div>
                  <button className="flex items-center max-w-xs font-medium focus:outline-none focus:shadow-solid" aria-label="User menu" aria-haspopup="true" onClick={() => toggleProfileDropdown()}>
                    <span className="mr-3 hover:text-gray-600 focus:outline-none focus:text-gray-800"></span>
                     <img className="w-10 h-10 rounded-full" src="//www.gravatar.com/avatar/379a2a0856fbcfac0c3a2efe44a8b78e?s=100&d=https%3A%2F%2Fs3.amazonaws.com%2Flaracasts%2Fimages%2Fforum%2Favatars%2Favatar-27.png" alt="Profile Picture" />
                  </button>
                </div>

                {openProfileDropdown && (
                  <div v-show="navigation.profile.open" className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                    <div className="py-1 bg-white rounded-md shadow-xs">
                      <a href="#" className="flex flex-row items-center px-4 py-2 text-sm text-gray-700 focus:text-gray-900 hover:text-gray-900 focus:outline-none hover:bg-gray-100 focus:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        <span className="ml-2"></span>
                      </a>
                      <a href="#" className="flex flex-row items-center px-4 py-2 text-sm text-gray-700 focus:text-gray-900 hover:text-gray-900 focus:outline-none hover:bg-gray-100 focus:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <span className="ml-2"></span>
                      </a>

                      <a  href="#" className="w-100 flex flex-row items-center px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-100 focus:outline-none focus:text-red-700 focus:bg-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      <span className="ml-2"></span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </div>

      </div>
    </nav>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => MainLayoutNav.handleClickOutside,
}

export default onClickOutside(MainLayoutNav, clickOutsideConfig)
