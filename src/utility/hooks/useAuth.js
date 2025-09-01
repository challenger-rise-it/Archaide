import { useState } from 'react'
// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'

const config = useJwt.jwtConfig
const jwt = useJwt

const useAuth = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // ** Handle User Login
  const handleLogin = async (data) => {
    setLoading(true)
    try {
      const res = await jwt.login(data)
      setUserData(res.user)
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem('userData', JSON.stringify(res.user))
      localStorage.setItem(config.storageTokenKeyName, res.token)
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(data.refreshToken),
      )
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      throw error
    }
    setLoading(false)
  }

  // ** Handle User Login
  const handleLoginAs = async (data) => {
    try {
      const backupToken = localStorage.getItem(config.storageTokenKeyName) || ''
      localStorage.setItem(config.storageBackupTokenKeyName, backupToken)
      const res = await jwt.loginAs(data)
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem(config.storageTokenKeyName, res.token)
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(data.refreshToken),
      )
      location.reload()
      location.assign('/home')
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      throw error
    }
  }

  const handleExit = () => {
    try {
      const backupToken =
        localStorage.getItem(config.storageBackupTokenKeyName) || ''
      localStorage.setItem(config.storageTokenKeyName, backupToken)
      localStorage.removeItem(config.storageBackupTokenKeyName)
      location.reload()
      location.assign('/home')
    } catch (err) {
      localStorage.removeItem(config.storageTokenKeyName)
      throw err
    }
  }

  // ** Handle User Register
  const handleRegister = async (data) => {
    setLoading(true)
    try {
      const res = await jwt.register(data)
      setUserData(res.user)
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem('userData', JSON.stringify(res.user))
      localStorage.setItem(config.storageTokenKeyName, res.token)
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(data.refreshToken),
      )
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      throw error
    }
    setLoading(false)
  }

  // ** Handle User Logout
  const handleLogout = () => {
    setUserData(null)
    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
    localStorage.removeItem(config.storageBackupTokenKeyName)
  }

  const updatePassword = async (value) => {
    setLoading(true)
    try {
      await axiosClient.patch('/change-password', value)
      toast('Successfully updated password!', { type: 'success' })
    } catch (error) {
      toast(
        error.message
          ? error.message
          : 'Failed to update the password. Please try again later.',
        {
          type: 'error',
        },
      )
    }
    setLoading(false)
  }

  const updateProfile = async (value) => {
    setLoading(true)
    try {
      await axiosClient.patch('/profile', value)
      await getAuth()
    } catch (error) {
      toast(
        error.message ? error.message : `Failed to update the user profile.`,
        {
          type: 'error',
        },
      )
    }
    setLoading(false)
  }

  const getAuth = async () => {
    setLoading(true)
    try {
      const data = await jwt.getUser()
      setUserData(data.user)
      // ** Add to user, accessToken & refreshToken to localStorage
      localStorage.setItem('userData', JSON.stringify(data.user))
      localStorage.setItem(config.storageTokenKeyName, data.token)
    } catch (error) {
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      setUserData(null)
    }
    setLoading(false)
  }

  const goCreateBot = () => {
    return userData?.onboarding?.isCompleted || userData?.onboarding?.isSkipped
  }

  return {
    userData,
    loading,
    handleLogin,
    handleLoginAs,
    handleExit,
    handleLogout,
    getAuth,
    handleRegister,
    goCreateBot,
    updatePassword,
    updateProfile,
  }
}

export default useAuth
