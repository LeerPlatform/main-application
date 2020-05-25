import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function MainLayout({ children }) {
    return (
      <div className="font-body bg-gray-100 text-gray-900 leading-normal">

        <SiteHeader />

        {children}

        <SiteFooter />
      </div>
    )
}
