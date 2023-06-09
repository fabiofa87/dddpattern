import OrderItem from "./order_item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("Customer ID is required");
    }
    if (this._items.length === 0) {
      throw new Error("Order items cannot be empty");
    }
    if (this.total() === 0) {
      throw new Error("Order items cannot be empty");
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity cannot be less than or equal to 0");
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
