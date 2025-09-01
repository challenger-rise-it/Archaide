import { toast } from 'react-toastify'
import axios from 'axios'
import { axiosClient } from '@src/@core/services'

// ** Get data on page or row change
export const getUsers = (params) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const res = await axiosClient.get('/users', { params })
      dispatch({
        type: 'SET_USERS',
        payload: {
          data: res.docs,
          total: res.totalDocs,
        },
      })
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      })
      throw error
    }
  }
}

// ** Get User
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const res = await axiosClient.get(`/users/${id}`)
      dispatch({
        type: 'SET_USER',
        payload: res,
      })
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      })
      dispatch({
        type: 'SET_USER',
        payload: null,
      })
      throw error
    }
  }
}

// ** Set User to Store directly
export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    try {
      dispatch({
        type: 'SET_USER',
        payload: user,
      })
    } catch (error) {
      dispatch({
        type: 'SET_USER',
        payload: null,
      })
      throw error
    }
  }
}

// ** Add new user
export const addUser = (user) => {
  return async (dispatch) => {
    axios
      .post('/apps/users/add-user', user)
      .then((response) => {
        dispatch({
          type: 'ADD_USER',
          payload: response,
        })
      })
      .then(() => {})
      .catch((err) => console.log(err))
  }
}

export const updateUser = (user, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const res = await axiosClient.patch(`/users/${id}`, user)
      toast('Successfully updated user!', { type: 'success' })
      dispatch({
        type: 'UPDATE_USER',
        payload: res,
      })
    } catch (error) {
      dispatch({
        type: 'SET_LOADING',
        payload: false,
      })
      toast('Update failed!', { type: 'error' })
      throw error
    }
  }
}

// ** Delete user
export const deleteUser = (id) => {
  return (dispatch) => {
    axios
      .delete('/apps/users/delete', { id })
      .then((response) => {
        dispatch({
          type: 'DELETE_USER',
          payload: response,
        })
      })
      .then(() => {})
  }
}

// **Approve user
export const approveUser = (id) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/users/${id}/approve`)
    toast('Successfully approved user!', { type: 'success' })
    dispatch({
      type: 'SET_USER_STATUS',
      payload: res,
    })
    return res
  } catch (error) {
    toast('Operation unsuccessful', { type: 'error' })
  }
}

export const rejectUser = (id) => async (dispatch) => {
  try {
    const res = await axiosClient.post(`/users/${id}/reject`)
    toast('Successfully rejected user!', { type: 'success' })
    dispatch({
      type: 'SET_USER_STATUS',
      payload: res,
    })
    return res
  } catch (error) {
    toast('Operation unsuccessful', { type: 'error' })
  }
}
