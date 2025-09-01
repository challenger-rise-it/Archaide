import { useState } from 'react'
import { axiosClient } from '@src/@core/services'
import { toast } from 'react-toastify'

const useBrokers = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const ENDPOINT = `/brokers/`

  // ** Load Payment Currencies
  const load = async () => {
    setLoading(true)
    // setData(null)
    try {
      const result = await axiosClient.get(ENDPOINT + '?limit=1000')
      if (result.success) setData(result.data)
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  // ** Store Payment Currencies
  const create = async (data, successHandler) => {
    setLoading(true)
    try {
      const { brokerageId, name, ...details } = data
      const result = await axiosClient.post(ENDPOINT, {
        brokerageId,
        name,
        details,
      })
      if (result.success) {
        toast('Successfully created a broker!', { type: 'success' })
        await load()
        successHandler()
      }
    } catch (error) {
      toast(error?.data?.errors?.msg || 'Failed to create the broker', {
        type: 'error',
      })
    }
    setLoading(false)
  }

  // ** Store Payment Currencies
  const update = async (id, data, successHandler) => {
    setLoading(true)
    try {
      const { brokerageId, name, status, ...details } = data
      const result = await axiosClient.patch(ENDPOINT + '/' + id, {
        brokerageId,
        name,
        status,
        details,
      })
      if (result.success) {
        toast('Successfully updated a broker!', { type: 'success' })
        await load()
        successHandler()
      }
    } catch (error) {
      toast('Failed to update broker!', { type: 'error' })
    }
    setLoading(false)
  }

  // ** Store Payment Currencies
  const remove = async (id, successHandler) => {
    setLoading(true)
    try {
      const result = await axiosClient.delete(ENDPOINT + '/' + id)
      if (result.success) {
        toast('Successfully removed the broker!', { type: 'success' })
        await load()
        successHandler()
      }
    } catch (error) {
      toast('Failed to remove the broker', { type: 'error' })
    }
    setLoading(false)
  }

  return {
    data,
    loading,
    load,
    create,
    update,
    remove,
  }
}

export default useBrokers
