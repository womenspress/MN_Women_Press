import { combineReducers } from 'redux';


const currentUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};


const allUsers = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_USERS':
      return action.payload;
    default:
      return state;
  }
}


const userReducer = combineReducers({
  currentUser,
  allUsers
})

// user will be on the redux state at:
// state.user
export default userReducer;
