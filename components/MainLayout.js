import Head from 'next/head'
import MainLayoutNav from './MainLayoutNav'
import MainLayoutFooter from './MainLayoutFooter'

export default function MainLayout({ children }) {
    return (
      <div className="text-gray-900 leading-normal">

        <MainLayoutNav />

        { children }

        <MainLayoutFooter />
      </div>
    )
}
