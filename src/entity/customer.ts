import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name = "";
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  isActive(): boolean {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  deactivate() {
    this._active = false;
  }
  activate() {
    if (this._address === undefined) {
      throw new Error("Address is required");
    }
    this._active = true;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
