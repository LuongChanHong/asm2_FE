import { userService } from "../../services/userServices";
import { USER_ACTION } from "./types/userTypes";
import { createAction } from ".";

export const logInAction = (loginInfo, callback) => {
  return async (dispatch) => {
    try {
      const result = await userService.logIn(loginInfo);
      dispatch(createAction(USER_ACTION.LOGIN, result.data));
      callback();
    } catch (err) {
      return err.response.statusText;
    }
  };
};

export const logOutAction = () => {
  return (dispatch) => {
    try {
      dispatch(createAction(USER_ACTION.LOGOUT));
    } catch (err) {
      console.log("err:", err);
    }
  };
};

export const signUpAction = (loginInfo, callback) => {
  return async (dispatch) => {
    try {
      const result = await userService.signUp(loginInfo);
      dispatch(createAction(USER_ACTION.SIGN_UP));
      callback();
    } catch (err) {
      console.log("err:", err);
    }
  };
};

export const inputSearchAction = (input) => {
  return (dispatch) => {
    try {
      dispatch(createAction(USER_ACTION.INPUT_SEARCH, input));
    } catch (err) {
      console.log("err:", err);
    }
  };
};

export const findByEmailAction = (email) => {
  return async (dispatch) => {
    const result = await userService.findByEmail(email);
    dispatch(createAction(USER_ACTION.FIND_BY_EMAIL, result.data));
    try {
    } catch (err) {
      console.log("err:", err);
    }
  };
};
