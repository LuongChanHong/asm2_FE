import { baseService } from "./baseServices";

export class UserService extends baseService {
  constructor() {
    super();
  }
  logIn = (userInfo) => {
    return this.post(`/login`, userInfo);
  };
  // signUp = (thongTinDangKi) => {
  //     return this.post("api/QuanLyNguoiDung/DangKy", thongTinDangKi);
  // };
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
