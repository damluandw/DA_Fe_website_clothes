import { Brand } from "./brand";
import { Provider } from "./provider";

export class Products {
  id: number = 0;
  name: String = '';
  priceIn: number = 0;
  priceOut: number = 0;
  discount: number = 0;
  image: String = '';
  images: String = '';
  description: String = '';
  createDate: Date= new Date();
  updateDate: Date= new Date();
  provider:  Provider= new Provider();
  brand: Brand= new Brand();
  countView: number = 0;
  countBuy: number = 0;
  showHome: boolean=false;
  status: boolean=false;
}
