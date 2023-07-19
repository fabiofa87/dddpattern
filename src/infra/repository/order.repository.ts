import { Order } from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: OrderItemModel,
        rejectOnEmpty: true,
      });
    } catch (err) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map((itemModel) => {
      return new OrderItem(
        itemModel.id,
        itemModel.name,
        itemModel.price,
        itemModel.product_id,
        itemModel.quantity
      );
    });

    const order = new Order(orderModel.id, orderModel.customer_id, items);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    const orders = await Promise.all(
      orderModels.map(async (orderModel) => {
        const orderItems = await OrderItemModel.findAll({
          where: { order_id: orderModel.id },
        });
        const items = orderItems.map(
          (orderItem) =>
            new OrderItem(
              orderItem.id,
              orderItem.name,
              orderItem.price,
              orderItem.product_id,
              orderItem.quantity
            )
        );
        return new Order(orderModel.id, orderModel.customer_id, items);
      })
    );
    return orders;
  }
}
