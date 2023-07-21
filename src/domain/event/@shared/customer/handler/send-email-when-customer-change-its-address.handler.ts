import EventHandlerInterface from "../../event-handler.interface";

export default class SendEmailWhenCustomerChangeItsAddress
  implements EventHandlerInterface
{
  handle(event: any): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`
    );
  }
}
