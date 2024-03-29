import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should change the price of all products", () => {
    const product1 = new Product("1", "Product 1", 200, "p1");
    const product2 = new Product("2", "Product 2", 300, "p2");

    const products = [product1, product2];
    ProductService.increasePrice(products, 10);

    expect(product1.price).toBe(220);
    expect(product2.price).toBe(330);
  });
});
