import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Fabio");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Fabio");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Rua 1", 123, "12345678", "Rio de Janeiro");
    let customer = CustomerFactory.createWithAddress("Fabio", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Fabio");
    expect(customer.address).toBeDefined();
    expect(customer.address).toBe(address);
  });
});
