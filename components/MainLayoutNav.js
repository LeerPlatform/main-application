import Link from 'next/link'

export default function MainLayoutNav({ children }) {
  return (
    <nav className="bg-white shadow relative z-40">
      <div className="container mx-auto px-6">

        <div className="flex items-center justify-between h-20">
          <div class="flex-shrink-0">
            <div class="flex items-center">

              <a class="flex flex-row items-center pr-3">
                <img src="/images/logo-icon-transparent-150x144.png" class="h-12" alt="Leer Platform Logo" />
              </a>

              <a class="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
                Catalog
              </a>

              <a class="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
                Topics
              </a>

            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}
