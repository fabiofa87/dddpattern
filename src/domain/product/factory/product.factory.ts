import { v4 } from "uuid";
import ProductInterface from "../entity/product.interface";
import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";

export default class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    if (type === "a") return new Product(v4(), name, price);
    if (type === "b") return new ProductB(v4(), name, price);

    throw new Error("Invalid product type");
  }
}
