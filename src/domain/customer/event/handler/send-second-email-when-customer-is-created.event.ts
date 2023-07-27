import EventHandlerInterface from "../../event-handler.interface";
import CustomerCreatedEvent from "../../../../customer/event/customer-created.event";

export default class SendSecondEmailWhenCustomerIsCreated
  implements EventHandlerInterface
{
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
