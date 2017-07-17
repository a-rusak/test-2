import Controller from "./controller";

export default class App {
  private controller: Controller;

  constructor() {
    this.controller = new Controller()
  }
}
