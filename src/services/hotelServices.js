import { baseService } from "./baseServices";

export class HotelService extends baseService {
  constructor() {
    super();
  }
}

export const hotelService = new HotelService();
