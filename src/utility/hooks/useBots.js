import { useState } from 'react'
import { axiosClient } from '@src/@core/services'
import { toast } from 'react-toastify'
import moment from 'moment'

const useBots = () => {
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loading_balance, setLoading_Balance] = useState(true)
  const [trades, setTrades] = useState([])
  const [balance, setBalance] = useState([])
  const ENDPOINT = `/robots`

  // ** Load Payment Currencies
  const load = async () => {
    setLoading(true)
    setData(null)
    try {
      const result = await axiosClient.get(ENDPOINT + '/all?limit=1000')
      if (result.success) setData(result.data)
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const get = async (id) => {
    setLoading(true)
    setSelected(null)
    try {
      const result = await axiosClient.get(ENDPOINT + '/info/' + id)
      if (result.success) setSelected(result.data)
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const get_info = async (id) => {
    try {
      const result = await axiosClient.get(ENDPOINT + '/info/' + id)
      if (result.success) {
        return result.data
      }
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
  }

  // ** Store Payment Currencies
  const create = async (data, successHandler) => {
    setLoading(true)
    try {
      const result = await axiosClient.post(ENDPOINT, data)
      if (result.success) {
        toast('Successfully created a bot!', { type: 'success' })
        await load()
        successHandler()
      }
    } catch (error) {
      toast('Failed to create a bot', { type: 'error' })
    }
    setLoading(false)
  }
  // ** Store Payment Currencies
  const update = async (id, data, successHandler) => {
    setLoading(true)
    try {
      const result = await axiosClient.patch(ENDPOINT + '/' + id, data)
      if (result.success) {
        toast('Successfully updated the bot!', { type: 'success' })
        await load()
        successHandler()
      }
    } catch (error) {
      toast('Failed to update the bot', { type: 'error' })
    }
    setLoading(false)
  }

  // ** Store Payment Currencies
  const remove = async (id, successHandler) => {
    setLoading(true)
    try {
      const result = await axiosClient.delete(ENDPOINT + '/' + id)
      if (result.success) {
        toast('Successfully removed the bot!', { type: 'success' })
        await load()
        successHandler()
      }
    } catch (error) {
      toast('Failed to remove the bot', { type: 'error' })
    }
    setLoading(false)
  }

  const fetchLog = async (id, page) => {
    setLoading(true)
    try {
      const result = await axiosClient.get(
        ENDPOINT + '/' + id + '/trades?page=' + (page + 1),
      )
      if (result.success) {
        setTrades(result.data)
      }
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const getBalance = async (daterange) => {
    setLoading_Balance(true)
    try {
      const result = await axiosClient.get(
        '/dashboard/balance?start_date=' +
          daterange[0] +
          '&end_date=' +
          new Date(moment(daterange[1]).subtract(-1, 'day')),
      )
      if (result.success) {
        setBalance(result.data)
      }
    } catch (error) {
      // toast('Action failed!', { type: 'error' })
    }
    setLoading_Balance(false)
  }

  return {
    data,
    selected,
    loading,
    loading_balance,
    trades,
    balance,
    load,
    get,
    create,
    update,
    remove,
    fetchLog,
    getBalance,
    get_info,
  }
}

export default useBots
