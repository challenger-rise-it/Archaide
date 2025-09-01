// ** React Imports
import { useEffect, useState } from 'react'
import { AppDataContextProvider } from '../../utility/context/app/appDataContext'

const BlankLayout = ({ children, ...rest }) => {
  // ** Hooks

  // ** States
  const [isMounted, setIsMounted] = useState(false)

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="blank-page">
      <div className="app-content content">
        <div className="content-wrapper">
          <AppDataContextProvider>
            <div className="content-body">{children}</div>
          </AppDataContextProvider>
        </div>
      </div>
    </div>
  )
}

export default BlankLayout
