import * as actionTypes from "../actions/actionsTypes";

// isLogged is a GLOBAL STATE:
const initialState = {
  isLogged: localStorage.getItem("userIsLogged"),
  emailCurrentUser: localStorage.getItem("currentUserEmail"),
  messageToUser: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      // If ID and Password are good:
      if (action.validLogin) {
        localStorage.setItem("userIsLogged", true);
        localStorage.setItem("currentUserEmail", action.email);
        return {
          ...state,
          isLogged: true,
          nameCurrentUser: action.name,
          emailCurrentUser: action.email,
        };
      } else {
        return {
          ...state,
          isLogged: false,
          messageToUser: action.errMessage,
        };
      }

    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLogged: false,
        nameCurrentUser: null,
      };

    case actionTypes.ERASE_MESSAGE:
      return {
        ...state,
        messageToUser: null,
      };

    default:
      return state;
  }
};

export default reducer;
