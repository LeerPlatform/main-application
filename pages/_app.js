import AuthContextProvider from '../contexts/AuthContext'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
    return (
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    )
}

export default MyApp
