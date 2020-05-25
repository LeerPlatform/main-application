import Link from 'next/link'
import { authenticationService, userService } from '../services'

export default function MainLayoutNav() {
    const isAuthenticated = false;

  return (
    <nav className="bg-white shadow relative z-40 border-t-4 border-primary-blue">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center">

              <Link href="/">
                <a className="flex flex-row items-center pr-3">
                  <img src="/images/logo-icon-transparent-150x144.png" className="h-12" alt="Leer Platform Logo" />
                </a>
              </Link>

              <Link href="/catalog">
                <a className="flex flex-row items-center px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Catalogus
                </a>
              </Link>

              <Link href="/topics">
                <a className="flex flex-row items-center px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Onderwerpen
                </a>
              </Link>

              <Link href="/news">
                <a className="flex flex-row items-center px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Nieuws
                </a>
              </Link>

              <Link href="/leaderbord">
                <a className="flex flex-row items-center px-3 py-2 rounded-md hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Leaderbord
                </a>
              </Link>

            </div>
          </div>

          {!isAuthenticated &&
            <div className="flex items-center">
              <Link href="/login">
                <a className="flex flex-row items-center px-4 py-2 mr-2 hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Log In
                </a>
              </Link>

              <Link href="/register">
              <a className="flex flex-row items-center px-4 py-2 border-2 border-primary-blue rounded-full hover:text-primary-blue focus:outline-none focus:text-gray-800 transition ease-out duration-700">
                  Get Started
                </a>
              </Link>
            </div>
          }

          {isAuthenticated &&
            <a className="flex flex-row items-center px-3 py-2 rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800 transition ease-out duration-700">
              userService.
            </a>
          }
        </div>

      </div>
    </nav>
  )
}
