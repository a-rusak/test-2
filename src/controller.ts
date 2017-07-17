import Store from "./Store";
import View from "./View";
import { CSS } from "./constants";
import { ACTION } from "./constants";
import { ItemValue } from "./store";

export default class Controller {
  private store: Store;
  private view: View;

  constructor() {
    this.store = new Store();
    this.view = new View(this.store);
    this.view.bindAddItem(this.insert.bind(this, false));
    this.view.bindAddComplexItem(this.insert.bind(this, true));
    this.view.bindListClickHandler(this.listClickHandler.bind(this));
    this.view.bindListDoubleClickHandler(this.listClickHandler.bind(this));
    this.getCount();
  }

  insert(isComplex: boolean) {
    this.store.insert(isComplex, item => {
      this.getCount();
      this.view.insert(item);
    });
  }

  @confirmDelete
  delete(id: string, isComplex: boolean) {
    this.store.remove(id, () => {
      this.getCount();
      this.view.remove(id);
    });
  }

  switch(id: string) {
    this.store.switch(id, () => {
      this.getCount();
      this.view.switch(id);
    });
  }

  select(id: string) {
    this.store.toggleSelect(id, () => {
      this.getCount();
      this.view.toggleSelect(id, this.store.boxes[id].isSelected);
    });
  }
  
  @checkAction
  listClickHandler(id: string, action: string) {
    const isComplex = this.store.boxes[id].isComplex;

    switch (action) {
      case ACTION.DELETE:
        this.delete(id, isComplex);
        break;

      case ACTION.SELECT:
        this.select(id);
        break;

      case ACTION.SWITCH:
        if (isComplex) {
          this.switch(id);
        }
        break;

      default:
        break;
    }
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

function checkAction(target: Controller, key: string, value: any) {
  return {
    value: function(id: string, action: string) {
      if (
        action === ACTION.DELETE ||
        action === ACTION.SELECT ||
        action === ACTION.SWITCH
      ) {
        return value.value.call(this, id, action);
      }
      throw new Error("Wrong action name");
    }
  };
}
