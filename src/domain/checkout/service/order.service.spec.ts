import Customer from "../../customer/entity/customer";
import { Order } from "../entity/order";
import OrderItem from "../entity/order_item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should get the total of all orders", () => {
    const orderItem = new OrderItem("1", "Product 1", 200, "p1", 2);
    const orderItem2 = new OrderItem("2", "Product 2", 300, "p2", 3);

    const order = new Order("1", "123", [orderItem]);
    const order2 = new Order("2", "123", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(1300);
  });

  it("should place an order", () => {
    const customer = new Customer("123", "Fabio Faria");
    const item1 = new OrderItem("1", "item 1", 10, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
