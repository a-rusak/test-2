import Store from "./Store";
import View from "./View";
import { $$, $on } from "./helpers";

declare const PROD: boolean;

interface DatasetEventTarget extends EventTarget {
  dataset: {
    id: string;
  };
  tagName: string;
}

interface DatasetEvent extends Event {
  target: DatasetEventTarget;
  getMessage(): string;
}

export default class Controller {
  private store: Store;
  private view: View;
  //private event: Event;

  constructor() {
    !PROD && console.log("Controller");
    this.store = new Store();
    this.view = new View(this.store);
    //this.event = new Event("build");
    //$on(document.body, "build", this.store.update.bind(this));
    this.view.bindAddItem(this.addItem.bind(this));
    this.view.bindListClickHandler(this.listClickHandler.bind(this));
    //this.view.bindAddItem(this.clickHadler.bind(this))
  }

  /* private clickHadler() {
    document.body.dispatchEvent(this.event);
  } */
  listClickHandler(event: DatasetEvent) {
    const target = event.target;
    const id = target.dataset.id;

    if (!target || !id) return;
    event.cancelBubble = true;

    //console.log(target.tagName, id);
    switch (target.tagName) {
      case "BUTTON":
        this.removeItem(id);
        break;

      case "FIGCAPTION": // if (x === 'value2')
        this.selectText(id);
        break;

      default:
        break;
    }
  }

  addItem() {
    const item = {
      id: Date.now(),
      isComplex: false
    };
    this.store.insert(item, () => {
      //this.view.clearNewTodo();
      //this._filter(true);
      this.view.addItem(item);
    });
  }

  removeItem(id: string) {
    this.store.remove(id, () => {
      this.view.remove(id);
    });
  }

  selectText(id: string) {
    console.log("selectText: ", id);
  }

  public remove() {
    //this.view.removeHandler()
  }
}
