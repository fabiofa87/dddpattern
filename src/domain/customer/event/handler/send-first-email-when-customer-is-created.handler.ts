import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../../../../customer/event/customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
