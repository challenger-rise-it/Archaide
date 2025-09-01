import { useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '@src/@core/services'
import { useDispatch } from 'react-redux'
import { param } from 'jquery'

const useProfileInfo = () => {
  const dispatch = useDispatch()
  const [profileInfo, setProfileInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [botnum, setBotNum] = useState([])
  const [isUsersLoading, setIsUsersLoading] = useState(true)
  const [status, setStatus] = useState('pending')

  const loadData = async (id) => {
    setLoading(true)
    try {
      const result = await axiosClient.get(`/users/${id}`)
      setProfileInfo(result)
      setStatus(result.status)
    } catch (error) {
      toast('Action failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const updateUser = async (user, id) => {
    setLoading(true)
    try {
      const updatedUser = await axiosClient.patch(`/users/${id}`, user)
      setProfileInfo(updatedUser)
      let newUsers = users.data
      if (newUsers.length) {
        newUsers.forEach((user, index) => {
          if (user._id == updatedUser._id) newUsers[index] = updatedUser
        })
      }
      setUsers({ ...users, data: newUsers })
      toast('Successfully updated user!', { type: 'success' })
    } catch (error) {
      toast('User update failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const editAccountSetting = async (user) => {
    setLoading(true)
    try {
      const updatedUser = await axiosClient.patch(`/profile`, user)
      dispatch({
        type: 'ACCOUNT_SETTINGS/SET_PROFILE',
        payload: {
          ...updatedUser,
          isLoading: false,
          error: null,
        },
      })
      toast('Your profile was updated successfully.', { type: 'success' })
    } catch (error) {
      toast('User update failed!', { type: 'error' })
    }
    setLoading(false)
  }

  const getUsers = async (params) => {
    setIsUsersLoading(true)
    try {
      const result = await axiosClient.get(`/users`, { params })
      const userInfo = {
        total: result.totalDocs,
        data: result.docs,
        isLoading: isUsersLoading,
      }
      setUsers(userInfo)
    } catch (error) {
      console.log(error)
      throw error
    }
    setIsUsersLoading(false)
  }

  const getBotNum = (id) => {
    try {
      const result = axiosClient.get(`/users/botnum/${id}`)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const deleteUser = async (id) => {
    setIsUsersLoading(true)
    try {
      const result = await axiosClient.delete(`/users/${id}`)
      setUsers({
        data: {
          ...users.data.filter((item) => item.id),
        },
        ...users,
      })
    } catch (error) {
      console.log(error)
      throw error
    }
    setIsUsersLoading(false)
  }

  const setUser = (user, id) => {
    setUsers({
      ...users,
      id,
      selectedUser: user,
    })
  }

  const overview = {
    loading,
    profileInfo,
    loadData,
  }
  const usersInfo = {
    users,
    updateUser,
    editAccountSetting,
    getUsers,
    setUser,
    deleteUser,
    getBotNum,
    isUsersLoading,
    status,
    botnum,
  }
  return {
    overview,
    usersInfo,
  }
}

export default useProfileInfo
