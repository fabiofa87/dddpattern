import ProductInterface from "./product.interface";

export class ProductB implements ProductInterface {
  private _id: string;
  private _productId?: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number, productId?: string) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this.name.length === 0) {
      throw new Error("Name is required");
    }
    if (this.price <= 0) {
      throw new Error("Price cannot be less than or equal to 0");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
