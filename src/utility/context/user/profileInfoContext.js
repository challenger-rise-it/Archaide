import { createContext, useEffect, useContext, useState } from 'react'
import { matchPath, useLocation, useParams } from 'react-router-dom'
import useProfileInfo from '@hooks/useProfileInfo'
import { PROFILE_TAB_ROUTES } from '@const/user'

export const ProfileInfoContext = createContext(null)
export const useProfileInfoCtx = () => useContext(ProfileInfoContext)
export const ProfileInfoContextProvider = ({ children }) => {
  const { id } = useParams()
  const location = useLocation()
  const { overview, installs, liveTime, appUsers, usersInfo, referralsInfo } =
    useProfileInfo(id)

  useEffect(() => {
    const route = PROFILE_TAB_ROUTES.find((route) => {
      return matchPath(`/user/${id}/${route.route}`, location.pathname)
    })
    if (route) {
      switch (route.route) {
        case '':
          overview.loadData(id)
          break
        default:
          break
      }
    }
  }, [location])

  const providerValue = {
    overview,
    installs,
    liveTime,
    appUsers,
    usersInfo,
    referralsInfo,
  }
  return (
    <ProfileInfoContext.Provider value={providerValue}>
      {children}
    </ProfileInfoContext.Provider>
  )
}
