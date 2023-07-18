import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw an error if ID is empty", () => {
    expect(() => {
      let product = new Product("", "123", 200, "200");
    }).toThrowError("Id is required");
  });

  it("should throw an error if name is empty", () => {
    expect(() => {
      let product = new Product("1", "", 100, `100`);
    }).toThrowError("Name is required");
  });

  it("should throw an error if price is 0 or less than 0", () => {
    expect(() => {
      let product = new Product("1", "Product 1", 0, "10");
    }).toThrowError("Price cannot be less than or equal to 0");
  });

  it("should change product name", () => {
    let product = new Product("1", "Product 1", 200, "200");
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change product price", () => {
    let product = new Product("1", "Product 1", 200, "200");
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
