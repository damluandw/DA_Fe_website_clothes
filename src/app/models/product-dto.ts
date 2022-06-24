import { Brand } from "./brand";

export class ProductDTO {
  id: number = 0;
  name: String = '';
  priceOut: number = 0;
  discount: number = 0;
  image: String = '';
  images: String = '';
  description: String = '';
  createDate: Date= new Date();
  updateDate: Date= new Date();
  brand: Brand= new Brand();
  coutView: number = 0;
  coutBuy: number = 0;
  showHome: boolean=false;
  status: boolean=false;
}
