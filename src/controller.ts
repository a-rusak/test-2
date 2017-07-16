import Store from "./Store";
import View from "./View";
import { $$, $on } from "./helpers";
import { CSS } from "./constants";

declare const PROD: boolean;

interface DatasetEventTarget extends EventTarget {
  dataset: {
    id: string;
  };
  tagName: string;
  classList: DOMTokenList;
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
    //!PROD && console.log("Controller");
    this.store = new Store();
    this.view = new View(this.store);
    //this.event = new Event("build");
    //$on(document.body, "build", this.store.update.bind(this));
    this.view.bindAddItem(this.addItem.bind(this));
    this.view.bindListClickHandler(this.listClickHandler.bind(this));
    this.view.bindListDoubleClickHandler(this.listClickHandler.bind(this));
    //this.view.bindAddItem(this.clickHadler.bind(this))
  }

  /* private clickHadler() {
    document.body.dispatchEvent(this.event);
  } */
  listClickHandler(id: string, ACTION: string) {
    console.log("listClickHandler", id, ACTION);
    switch (ACTION) {
      case "DELETE":
        this.removeItem(id);
        break;

      case "SELECT":
        this.selectItem(id);
        break;

      default:
        break;
    }
  }

  listDoubleClickHandler(event: DatasetEvent) {
    const target = event.target;
    const id = target.dataset.id;

    if (!target || !id || !target.classList.contains(CSS.block.name)) return;
    //event.cancelBubble = true;
  }

  addItem() {
    const item = {
      id: Date.now(),
      isComplex: false,
      isSelected: false
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

  selectItem(id: string) {
    //console.log("selectItem", id)
    this.store.toggleSelect(id, () => {
      this.view.toggleSelect(id, this.store.boxes[id].isSelected);
    })
  }

  public remove() {
    //this.view.removeHandler()
  }
}
