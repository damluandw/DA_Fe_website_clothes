import { Color } from "./color";
import { Products } from "./products";

export class ProductColor {
  id: number = 0;
  product: Products = new Products();
  color: Color = new Color();
}
