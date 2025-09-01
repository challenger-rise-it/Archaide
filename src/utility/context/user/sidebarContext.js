import { createContext, useState } from 'react'
import { useSearchParams } from '@src/navigation'

const sidebarContextValue = {
  sidebarOpen: false,
  isCreate: false,
  setSidebarOpen: (open) => {},
  setToCreateMode: (create) => {},
}
export const SidebarCtx = createContext(sidebarContextValue)

export const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebar] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const setToCreateMode = (open) => {
    setIsCreate(open)
  }
  const setSidebarOpen = (create) => {
    setSidebar(create)
  }

  return (
    <SidebarCtx.Provider
      value={{ sidebarOpen, setSidebarOpen, isCreate, setToCreateMode }}
    >
      {children}
    </SidebarCtx.Provider>
  )
}
