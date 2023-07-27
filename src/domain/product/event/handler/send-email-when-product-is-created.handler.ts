import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: any): void {
    console.log(`Send email when product is created: ${event}`);
  }
}
