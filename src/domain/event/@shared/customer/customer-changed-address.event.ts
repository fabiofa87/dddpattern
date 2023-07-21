import CustomerCreatedEvent from "./customer-created.event";

export default class CustomerChangedAddressEvent extends CustomerCreatedEvent {
  constructor(eventData: any) {
    super(eventData);
  }
}
