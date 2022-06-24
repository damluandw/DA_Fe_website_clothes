import { Customer } from './customer';
import { OrderDetail } from './order-detail';

export class Order {
  id: number =0;
  firstName: String = '';
  lastName: String = '';
  email: String = '';
  phone: String = '';
  country: String = '';
  city: String = '';
  streetAddress: String = '';
  postcode: String = '';
  total: number = 0;
  createDate: Date = new Date();
  updateDate: Date = new Date();
  status: boolean = false;
  orderDetails: Array<OrderDetail> = [];
  customer: Customer = new Customer();
}
