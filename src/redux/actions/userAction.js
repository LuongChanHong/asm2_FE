import { userService } from "../../services/userServices";
import { USER_ACTION } from "./types/userTypes";
import { createAction } from ".";

export const logInAction = (loginInfo, callback) => {
  return async (dispatch) => {
    try {
      const result = await userService.logIn(loginInfo);
      dispatch(createAction(USER_ACTION.LOGIN, result.data));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: loginInfo.email })
      );
      callback();
    } catch (err) {
      console.log("err:", err);
    }
  };
};
