import { Product } from "../entity/product";

export class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    for (const product of products) {
      product.changePrice((product.price * percentage) / 100 + product.price);
    }
  }
}
