//** React Imports
import { useState, useEffect, useSelector } from 'react'

import { getUserData } from '@utils'
// ** Configs
import themeConfig from '@configs/themeConfig'

export const useLayout = () => {
  // ** States
  const userData = getUserData()
  const lastLayout = 'vertical'
  const [layout, setLayout] = useState(lastLayout)

  // ** Return a wrapped version of useState's setter function
  const setValue = (value) => {
    try {
      // ** Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(layout) : value

      // ** Set state
      setLayout(valueToStore)
    } catch (error) {
      // ** A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  const handleLayout = () => {
    // ** If layout is horizontal & screen size is equals to or below 1200
    if (layout === 'horizontal' && window.innerWidth <= 1200) {
      setLayout('vertical')
    }
    // ** If lastLayout is horizontal & screen size is equals to or above 1200
    if (lastLayout === 'horizontal' && window.innerWidth >= 1200) {
      setLayout('horizontal')
    }
  }

  // ** ComponentDidMount
  useEffect(() => {
    handleLayout()
  }, [])

  useEffect(() => {
    // ** Window Resize Event
    window.addEventListener('resize', handleLayout)
  }, [layout])

  return [layout, setValue]
}
