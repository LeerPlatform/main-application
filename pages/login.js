import MainLayout from '../components/MainLayout'
import { useState, useContext } from 'react';
import fetch from 'isomorphic-unfetch'
import { setUserToken } from '../lib/auth'
import Router from 'next/router'

const handleLogin = async (email, password) => {
  const loginResponse = await fetch('http://api.leer-platform.test/v1/auth/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (loginResponse.status !== 200) {
    throw new Error(await loginResponse.text())
  }

  const { token } = await loginResponse.json()
  setUserToken(token)

  Router.push('/authenticated')
}

function Login({ cxt }) {
  const [userData, setUserData] = useState({
    email: 'cyril@example.com',
    password: 'secret',
    error: '',
  })

  async function handleSubmit(event) {
    event.preventDefault()

    setUserData({...userData, error: ''})

    const email = userData.email
    const password = userData.password

    try {
      await handleLogin(email, password)
    } catch (error) {
      console.error(error)
      setUserData({ ...userData, error: error.message })
    }
  }

  return (
    <MainLayout>
      <div className="w-full max-w-xs mx-auto py-12">
        {userData.error && <p className="error">Error: {userData.error}</p>}

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>

            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              placeholder="E-mail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={event =>
                setUserData(
                  Object.assign({}, userData, { email: event.target.value })
                )
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              value={userData.password}
              placeholder="******************"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={event =>
                setUserData(
                  Object.assign({}, userData, { password: event.target.value })
                )
              }
            />
            {/* <!-- <p className="text-red-500 text-xs italic">Please choose a password.</p> --> */}
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {/* {{ $t('loginPage.loginButton') }} */}
              Login
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default Login
