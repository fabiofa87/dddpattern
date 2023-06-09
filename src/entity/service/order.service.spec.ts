import { Order } from "../order";
import OrderItem from "../order_item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should get the total of all orders", () => {
    const orderItem = new OrderItem("1", "Product 1", 200, 2);
    const orderItem2 = new OrderItem("2", "Product 2", 300, 3);

    const order = new Order("1", "123", [orderItem]);
    const order2 = new Order("2", "123", [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(200 * 2 + 300 * 3);
  });
});
