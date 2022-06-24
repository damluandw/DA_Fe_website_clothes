import { Color } from './color';
import { Order } from './order';
import { Products } from './products';
import { Size } from './size';

export class OrderDetail {
  product: Products = new Products();
  id: number = 0;
  quatity: number = 1;
  color: Color = new Color();
  size: Size = new Size();
  price: number = 0;
  createDate: Date = new Date();
  order: Order = new Order();
  status: boolean=false;
}
