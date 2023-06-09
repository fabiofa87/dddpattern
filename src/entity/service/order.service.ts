import { Customer } from "../customer";
import { Order } from "../order";
import OrderItem from "../order_item";
import { v4 as uuid } from "uuid";

export class OrderService {
  static total(orders: Order[]) {
    let total = 0;
    for (const order of orders) {
      total += order.total();
    }
    return total;
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
