import ProductFactory from "./product.factory";

describe("ProductFactory unit test", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "product a", 1);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product a");
    expect(product.price).toBe(1);

    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const product = ProductFactory.create("b", "product b", 2);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product b");
    expect(product.price).toBe(2);

    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when type is invalid", () => {
    expect(() => {
      ProductFactory.create("c", "product c", 3);
    }).toThrowError("Invalid product type");
  });
});
