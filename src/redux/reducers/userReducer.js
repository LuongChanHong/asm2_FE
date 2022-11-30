import { USER_ACTION } from "../actions/types/userTypes";

const initialState = {
  loginUser: {
    // _id: "",
    // username: "",
    // password: "",
    // fullName: "",
    // phoneNumber: "",
    // email: "",
    // isAdmin: false,
    // identity: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION.LOGIN:
      state.loginUser = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
