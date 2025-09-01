import { createContext, useEffect, useContext, useState } from 'react'
import useBrokerages from '@hooks/useBrokerages'
import useBots from '@hooks/useBots'
import useBrokers from '@hooks/useBrokers'

export const appDataContext = createContext(null)
export const useAppDataCtx = () => useContext(appDataContext)
export const AppDataContextProvider = ({ children }) => {
  const brokerages = useBrokerages()
  const bots = useBots()
  const brokers = useBrokers()
  const appData = {
    brokerages,
    bots,
    brokers,
  }
  return (
    <appDataContext.Provider value={appData}>
      {children}
    </appDataContext.Provider>
  )
}
