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
  // getInforUser = () => {
  //     return this.post("api/QuanLyNguoiDung/ThongTinNguoiDung");
  // };
  // updateInfor = (thongTinNguoiDung) => {
  //     return this.put(
  //         `api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
  //         thongTinNguoiDung
  //     );
  // };
}

export const userService = new UserService();
