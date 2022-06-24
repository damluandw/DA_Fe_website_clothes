import { Order } from "./order";

export class Customer {
  id: number = 0;
  firstName: String = '';
  lastName: String = '';
  email: String = '';
  phone: String = '';
  password: String = '';
  country: String = '';
  city: String = '';
  streetAddress: String = '';
  postcode: String = '';
  avatar: String = '';
  codeConfirm: String = '';
  createDate: Date = new Date();
  order: Array<Order>=[];
  status: boolean = false;
}
