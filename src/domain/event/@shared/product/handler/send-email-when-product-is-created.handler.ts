import EventHandlerInterface from "../../event-handler.interface";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: any): void {
    throw new Error("Method not implemented.");
  }
}
