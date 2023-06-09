import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Fabio Faria");
const address = new Address("Rua 1", "Cidade 1", "Estado 1", "123456");

customer.Address = address;
customer.activate();
