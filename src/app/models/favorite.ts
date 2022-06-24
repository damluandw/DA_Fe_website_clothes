import { Customer } from "./customer";
import { Products } from "./products";

export class Favorite {
  id: number = 0;
  createDate:Date= new Date();;
  status: boolean = false;
  product: Products = new Products();
  customer: Customer = new Customer();
}
