import { useEffect, useContext } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { isServer } from './isServer'

export const setUserToken = (token) => {
  cookie.set('token', token, { expires: 1 })
}

export const fetchUser = async (ctx) => {
  const token = auth(ctx)

  const response = await fetch('http://api.leer-platform.test/v1/auth/user/current', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  })

  const { data } = await response.json()

  return data
}

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  if (!token) {
    if (isServer()) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    } else {
      Router.push('/login')
    }
  }

  return token
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

export const withAuthSync = WrappedComponent => {
  const AuthComponent = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  // AuthComponent.getInitialProps = async ctx => {
  //   const componentProps =
  //     WrappedComponent.getInitialProps &&
  //     (await WrappedComponent.getInitialProps(ctx))

  //   return { ...componentProps }
  // }

  return AuthComponent
}
