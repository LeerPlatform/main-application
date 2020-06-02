import Link from 'next/link'

export default function SiteFooter({ children }) {
  return (
    <footer className="bg-white">
      <div className="py-8 sm:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            <div className="sm:w-2/5 px-3 mb-8 sm:mb-0">
              <h2 className="text-sm font-bold mb-5 select-none">&nbsp;</h2>
              <div className="flex">
                <img src="images/logo-icon-transparent-150x144.png" className="h-12" />
                <p className="ml-4 text-sm text-gray-700">Het Leer Platform is een online leeromgeving waarop cursussen worden aangeboden over diverse onderwerpen.</p>
              </div>
              {/* Social media icons */}
            </div>

            <div className="w-1/3 sm:w-1/5 px-3">
              <h2 className="text-sm font-bold mb-4">Organisatie</h2>

              <nav className="flex flex-col text-sm text-gray-700 leading-relaxed">
                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Over</a>
                </Link>

                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Team</a>
                </Link>

                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Blog</a>
                </Link>
              </nav>

            </div>

            <div className="w-1/3 sm:w-1/5 px-3">
              <h2 className="text-sm font-bold mb-4">Help</h2>

              <nav className="flex flex-col text-sm text-gray-700 leading-relaxed">
                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Knowledge Base</a>
                </Link>

                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Support</a>
                </Link>
              </nav>
            </div>

            <div className="w-1/3 sm:w-1/5 px-3">
              <h2 className="text-sm font-bold mb-4">Lesgeven</h2>

              <nav className="flex flex-col text-sm text-gray-700 leading-relaxed">
                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Word een instructeur</a>
                </Link>

                <Link href="/test">
                  <a className="hover:text-primary-blue transition ease-out duration-500">Naar studio gaan</a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="py-">
        <div className="container mx-auto px-4">
          <p className="py-4 text-sm text-gray-700 text-center border-t border-gray-300">&copy; { (new Date()).getFullYear()} Leer Platform. All right reserved.</p>
        </div>
      </div>
    </footer>
  )
}
