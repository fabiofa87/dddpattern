import { Order } from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw an error when ID is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw an error when customer id is empty", async () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrowError("Customer ID is required");
  });

  it("should throw an error if orderItems is empty", () => {
    expect(() => {
      let order = new Order("1", "123", []);
    }).toThrowError("Order items cannot be empty");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 10, "2", 2);
    const item2 = new OrderItem("2", "Item 2", 20, "1", 1);
    const item3 = new OrderItem("3", "Item 3", 30, "3", 3);

    const order = new Order("1", "123", [item1, item2, item3]);
    expect(order.total()).toBe(130);
  });

  it("should throw an error if the total of items are 0", () => {
    const item1 = new OrderItem("1", "Item 1", 0, "1", 0);
    const item2 = new OrderItem("2", "Item 2", 0, "2", 0);
    const item3 = new OrderItem("3", "Item 3", 0, "3", 0);

    expect(() => {
      const order = new Order("1", "123", [item1, item2, item3]);
    }).toThrowError("Order items cannot be empty");
  });

  it("should change items", () => {
    const item1 = new OrderItem("1", "Item 1", 10, "1", 1);

    const order = new Order("1", "123", [item1]);
    const item2 = new OrderItem("2", "Item 2", 20, "2", 2);
    order.changeItems([item2]);

    expect(order.items).toStrictEqual([item2]);
  });
});
