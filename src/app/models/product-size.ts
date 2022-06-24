import { Products } from './products';
import { Size } from './size';

export class ProductSize {
  id: number = 0;
  product: Products = new Products();
  size: Size = new Size();
}
