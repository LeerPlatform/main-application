import React, { useState } from 'react'

export const AuthContext = React.createContext()

const defaultState = {
  user: null,
}

const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(defaultState)

  function setUser(user) {
    setSession({...session, user})
  }

  return (
    <AuthContext.Provider value={session, setUser}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
