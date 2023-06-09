import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer", () => {
  it("should throw an error when id is empty ", () => {
    expect(() => {
      let customer = new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("1", "Street 1", "12345", "London");
    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it("should deactivate a customer", () => {
    const customer = new Customer("1", "John Doe");
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should return an error if customer is trying to be active and doesnt have an address", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is required");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
