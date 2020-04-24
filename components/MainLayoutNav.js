import Link from 'next/link'

export default function MainLayoutNav({ children }) {
  return (
    <nav className="bg-white shadow relative z-40">
      <div className="container mx-auto px-6">

        <div className="flex items-center justify-between h-20">
          <div class="flex-shrink-0">
            <div class="flex items-center">

              <a class="flex flex-row items-center pr-3">
                <img src="~/assets/img/logo-icon-transparent-150x144.png" class="h-12" alt="Leer Platform Logo">
              </a>

              <a class="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
                {{ $t('BrandDefault.nav.catalog') }}
              </a>

              <a class="flex flex-row items-center px-3 py-2 font-medium rounded-md hover:text-gray-600 focus:outline-none focus:text-gray-800">
                {{ $t('BrandDefault.nav.topics') }}
              </a>

          </div>
        </div>

      </div>
    </nav>
  )
}
