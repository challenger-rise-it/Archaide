import { createContext, useContext } from 'react'
import useAuth from '@hooks/useAuth'

export const authContext = createContext(null)
export const useAuthCtx = () => useContext(authContext)
export const AuthContextProvider = ({ children }) => {
  const auth = useAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
