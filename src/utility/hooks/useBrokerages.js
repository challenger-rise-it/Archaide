import { useState } from 'react'
import { axiosClient } from '@src/@core/services'
import { toast } from 'react-toastify'

const useBrokerages = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const ENDPOINT = `/brokerages/`

  // ** Load Payment Currencies
  const load = async () => {
    setLoading(true)
    setData(null)
    try {
      const result = await axiosClient.get(ENDPOINT + '?limit=1000')
      if (result.success) setData(result.data)
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  return {
    data,
    loading,
    load,
  }
}

export default useBrokerages
