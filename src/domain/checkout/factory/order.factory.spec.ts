import { v4 } from "uuid";
import OrderFactory from "./order.factory";

describe("OrderFactory unit test", () => {
  it("should create an order", () => {
    const orderProps = {
      id: v4(),
      customerId: v4(),
      items: [
        {
          id: v4(),
          name: "Product1",
          productId: v4(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
