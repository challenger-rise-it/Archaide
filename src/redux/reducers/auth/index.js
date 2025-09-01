// **  Initial State
const initialState = {
  userData: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        [action.config.storageTokenKeyName]:
          action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]:
          action[action.config.storageRefreshTokenKeyName],
      }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: null, ...obj }
    case 'SET_DATA':
      return {
        ...state,
        userData: action.payload.userData,
      }
    default:
      return state
  }
}

export default authReducer
