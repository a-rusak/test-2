import Controller from "./controller";

export default class App {
  private test: string;
  private controller: Controller;

  constructor() {
    this.controller = new Controller()
  }
}
