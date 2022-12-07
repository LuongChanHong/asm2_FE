import { baseService } from "./baseServices";

export class UserService extends baseService {
  constructor() {
    super();
  }
  logIn = (userInfo) => {
    return this.post(`/login`, userInfo);
  };
  signUp = (userInfo) => {
    return this.post("/signup", userInfo);
  };
  findByEmail = (email) => {
    return this.post("/find-user-by-email", email);
  };
}

export const userService = new UserService();
