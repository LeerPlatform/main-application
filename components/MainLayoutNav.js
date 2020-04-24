import Link from 'next/link'

export default function MainLayoutNav({ children }) {
  return (
    <nav className="bg-white shadow relative z-40">
      <div className="container mx-auto px-6">

        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center">

              <Link href="/">
                <a className="flex flex-row items-center pr-3">
                  <img src="/images/logo-icon-transparent-150x144.png" className="h-12" alt="Leer Platform Logo" />
                </a>
              </Link>

              <Link href="/catalog">
                <a className="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
                  Catalog
                </a>
              </Link>

              {/* <a class="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
                Topics
              </a> */}

            </div>
          </div>
        </div>

        <div className="flex items-center">
          <a className="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
            Login
          </a>

          <a className="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
            Register
          </a>
        </div>

      </div>
    </nav>
  )
}
