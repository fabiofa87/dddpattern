import Customer from "../../customer/entity/customer";
import Address from "../../customer/value-object/address";

let customer = new Customer("123", "Fabio Faria");
const address = new Address("Rua 1", 1, "Estado 1", "123456");

customer.Address = address;
customer.activate();
