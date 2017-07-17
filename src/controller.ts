import Store from "./Store";
import View from "./View";
import { CSS } from "./constants";
import { DELETE, SWITCH, SELECT } from "./constants";
import { ItemValue } from "./store";

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

  constructor() {
    this.store = new Store();
    this.view = new View(this.store);
    this.view.bindAddItem(this.addItem.bind(this, false));
    this.view.bindAddComplexItem(this.addItem.bind(this, true));
    this.view.bindListClickHandler(this.listClickHandler.bind(this));
    this.view.bindListDoubleClickHandler(this.listClickHandler.bind(this));
    this.getCount();
  }

  listClickHandler(id: string, Action: string) {
    switch (Action) {
      case DELETE:
        this.removeItem(id, this.store.boxes[id].isComplex);
        break;

      case SELECT:
        this.selectItem(id);
        break;

      case SWITCH:
        if (this.store.boxes[id].isComplex) {
          this.switchItem(id);
        }
        break;

      default:
        break;
    }
  }

  addItem(isComplex: boolean) {
    this.store.insert(isComplex, item => {
      this.getCount();
      this.view.addItem(item);
    });
  }

  @confirmDelete
  removeItem(id: string, isComplex: boolean) {
    this.store.remove(id, () => {
      this.getCount();
      this.view.remove(id);
    });
  }

  switchItem(id: string) {
    this.store.switch(id, () => {
      this.getCount();
      this.view.switch(id);
    });
  }

  selectItem(id: string) {
    this.store.toggleSelect(id, () => {
      this.getCount();
      this.view.toggleSelect(id, this.store.boxes[id].isSelected);
    });
  }

  getCount() {
    this.store.count(counters => {
      this.view.setCounters(counters);
    });
  }
}

function confirmDelete(target: Controller, key: string, value: any) {
  return {
    value: function(id: string, isComplex: boolean) {
      let isApproved = true;
      if (isComplex) {
        isApproved = confirm("Are you sure?");
      }
      const result = isApproved ? value.value.call(this, id, isComplex) : null;

      return result;
    }
  };
}
