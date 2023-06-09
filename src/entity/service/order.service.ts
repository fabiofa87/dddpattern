import { Order } from "../order";

export class OrderService {
  static total(orders: Order[]) {
    let total = 0;
    for (const order of orders) {
      total += order.total();
    }
    return total;
  }
}
