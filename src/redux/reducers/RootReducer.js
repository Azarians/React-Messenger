// import { combineReducers } from 'redux';
// import simpleReducer from './simpleReducer';
// import secondReducer from './secondReducer';
//
// export default combineReducers({
//  styles: simpleReducer,
//  data: secondReducer
// });

const initialState = {
  mode: localStorage.getItem("mode") || "light",
  logged: localStorage.getItem("logged") == "true" || false,
  newMessage: '',
  page: 'main',
  sidebarOpened: false
}

export default (state = initialState, action) =>{
  let newVals = {...state};
  switch (action.type) {
    case 'CHANGE_MODE':
     newVals.mode = action.payload;
     return newVals
    case 'SIGN_IN':
     newVals.logged = action.payload;
     return newVals
    case 'SET_NEW_MESSAGE':
     newVals.newMessage = action.payload;
     return newVals
    case 'CHANGE_PAGE':
     newVals.page = action.payload;
     return newVals
     case 'TOGGLE_SIDEBAR':
      newVals.sidebarOpened = action.payload;
      return newVals
    case 'SELECT_USER':
     newVals.page = "messenger";
     newVals.selected_user_uid = action.payload;
     return newVals
    default:
     return state
  }
}
