import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendEmailWhenCustomerChangeItsAddress
  implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: EventInterface): void {
    console.log(
      `Endereço do cliente ${event.eventData.id}, ${
        event.eventData.name
      } alterado para: ${event.eventData.Address.toString()}`
    );
  }
}
