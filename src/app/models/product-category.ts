import { Category } from "./category";
import { Products } from "./products";

export class ProductCategory {
  id: number = 0;
  product: Products = new Products();
  category: Category = new Category();
}
