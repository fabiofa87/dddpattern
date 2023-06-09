import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import { Product } from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const productObj = new Product("123", "Product 1", 10, `10`);

    await productRepository.create(productObj);

    const productModel = await ProductModel.findOne({
      where: { id: "123" },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productObj = new Product("123", "Product 1", 10);

    await productRepository.create(productObj);

    const productModel = await ProductModel.findOne({
      where: { id: "123" },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 10,
    });

    productObj.changeName("Product 2");
    productObj.changePrice(20);

    await productRepository.update(productObj);

    const productModelUpdated = await ProductModel.findOne({
      where: { id: "123" },
    });

    expect(productModelUpdated.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 2",
      price: 20,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productObj = new Product("123", "Product 1", 10, "1");

    await productRepository.create(productObj);

    const productModel = await ProductModel.findOne({
      where: { id: "123" },
    });

    const foundProdct = await productRepository.find("123");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProdct.id,
      name: foundProdct.name,
      price: foundProdct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const productObj1 = new Product("123", "Product 1", 10);
    const productObj2 = new Product("456", "Product 2", 20);

    await productRepository.create(productObj1);
    await productRepository.create(productObj2);

    const foundProducts = await productRepository.findAll();

    const products = [productObj1, productObj2];

    expect(foundProducts).toEqual(products);
  });
});
