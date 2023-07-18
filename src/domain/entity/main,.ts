import Address from "./address";
import Customer from "./customer";
import { Order } from "./order";
import OrderItem from "./order_item";

let customer = new Customer("123", "Fabio Faria");
const address = new Address("Rua 1", 1, "Estado 1", "123456");

customer.Address = address;
customer.activate();
