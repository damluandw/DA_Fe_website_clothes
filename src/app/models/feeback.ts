import { Customer } from './customer';
import { Products } from './products';

export class Feeback {
  id: number = 0;
  fullName: String = '';
  email: String = '';
  avatar: String = '';
  content: String = '';
  rate: String = '';
  createDate: String = '';
  status: boolean = false;
  product: Products = new Products();
  customer: Customer = new Customer();
}
