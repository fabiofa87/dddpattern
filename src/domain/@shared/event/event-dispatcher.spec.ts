import Address from "../../customer/value-object/address";
import Customer from "../../entity/customer";
import CustomerChangedAddressEvent from "./customer/customer-changed-address.event";
import CustomerCreatedEvent from "./customer/customer-created.event";
import SendEmailWhenCustomerChangeItsAddress from "./customer/handler/send-email-when-customer-change-its-address.handler";
import SendEmailWhenCustomerIsCreatedHandler from "./customer/handler/send-first-email-when-customer-is-created.handler";
import SendSecondEmailWhenCustomerIsCreated from "./customer/handler/send-second-email-when-customer-is-created.event";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const firstHandler = new SendEmailWhenCustomerIsCreatedHandler();
    const secondHandler = new SendSecondEmailWhenCustomerIsCreated();

    const spyFirstHandler = jest.spyOn(firstHandler, "handle");
    const spySecondHandler = jest.spyOn(secondHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", firstHandler);
    eventDispatcher.register("CustomerCreatedEvent", secondHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(firstHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(secondHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      email: "customer@one.com",
      address: {
        street: "Street 1",
        number: 1,
        city: "City 1",
        zip: "00000-000",
      },
      active: true,
      rewardPoints: 0,
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyFirstHandler).toHaveBeenCalled();
    expect(spySecondHandler).toHaveBeenCalled();
  });

  it("should notify handlers when customer change its address", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendEmailWhenCustomerChangeItsAddress();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler);

    let customer = new Customer("123", "Fabio");
    const address = new Address("Rua A", 12, "24555-000", "Rio de Janeiro");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);

    const newAddress = new Address("Rua B", 13, "24555-000", "Rio de Janeiro");
    customer.changeAddress(newAddress);

    const customerChangedAddressEvent = new CustomerChangedAddressEvent(
      customer
    );

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalledWith(customerChangedAddressEvent);
  });
});
