// **  Initial State
const initialState = {
  total: 0,
  data: [],
  selectedUser: null,
  isLoading: false,
  error: null,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        total: action.payload.total,
        data: action.payload.data,
        isLoading: false,
      }
    case 'SET_USER':
      return { ...state, selectedUser: action.payload, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER_STATUS':
      return {
        ...state,
        selectedUser: { ...state.selectedUser, status: action.payload.status },
      }
    case 'UPDATE_USER':
      let id = action.payload._id
      return {
        ...state,
        isLoading: false,
        data: state.data.map((it) => {
          if (it._id == id) {
            return action.payload
          }
          return it
        }),
      }
    default:
      return state
  }
}

export default usersReducer
