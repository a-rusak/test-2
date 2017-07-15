import Store from "./Store";
import View from "./View";
import { $$, $on } from "./helpers";

export default class TextBoxController {
  private store: Store;
  private view: View;
  private event: Event;
  
  constructor() {
    console.log("TextBoxController");
    this.store = new Store();
    this.view = new View(this.store);
    this.event = new Event("build");
    $on(document.body, "build", this.store.update.bind(this));
    this.view.bindAddItem(this.clickHadler.bind(this))
  }

  private clickHadler() {
    document.body.dispatchEvent(this.event);
  }


  public add() {
    //this.view.addHandler()
  }
  public remove() {
    //this.view.removeHandler()
  }
}
