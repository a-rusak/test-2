import Store from "./Store";
import { $$, $on } from "./helpers";
import { CSS } from "./constants";
import { DELETE, SWITCH, SELECT } from "./constants";
import { ItemValue, CountersValue } from "./store";

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

interface ViewCountersValue {
  total: Element;
  totalSelected: Element;
  totalSelectedRed: Element;
  totalSelectedGreen: Element;
}

export default class View {
  private store: Store;
  private $btn: Element;
  private $btnComplex: Element;
  private $container: Element;
  private $counters: ViewCountersValue;

  constructor(store: Store) {
    this.store = store;
    this.$btn = $$(`.${CSS.addButton}`);
    this.$btnComplex = $$(`.${CSS.addButtonComplex}`);
    this.$container = $$(`.${CSS.block.container}`);
    this.$counters = {
      total: $$("#counterTotal"),
      totalSelected: $$("#counterTotalSelected"),
      totalSelectedRed: $$("#counterTotalSelectedRed"),
      totalSelectedGreen: $$("#counterTotalSelectedGreen")
    };
  }

  addItem(item: ItemValue) {
    this.$container.appendChild(this.renderBox(item));
  }

  remove(id: string) {
    const elem = $$(`figure[data-id="${id}"]`, this.$container);
    this.$container.removeChild(elem);
  }

  clickHander(
    callback: (id: string, ACTION: string) => void,
    event: DatasetEvent
  ) {
    const target = event.target;
    const id = target.dataset.id;
    let ACTION: string = "";

    if (!target || !id) {
      return;
    }
    //event.cancelBubble = true;

    if (target.classList.contains(CSS.block.button)) {
      ACTION = DELETE;
    }
    if (
      target.classList.contains(CSS.block.name) ||
      target.classList.contains(CSS.block.text)
    ) {
      if (event.type === "dblclick") {
        ACTION = SWITCH;
      } else {
        ACTION = SELECT;
      }
    }
    callback(id, ACTION);
  }

  toggleSelect(id: string, isSelected: boolean) {
    const elem = $$(`figure[data-id="${id}"]`, this.$container);
    if (elem && elem.classList) {
      elem.classList.toggle(CSS.block.selected, isSelected);
    }
  }

  switch(id: string) {
    const elem = $$(`figure[data-id="${id}"]`, this.$container);
    if (elem && elem.classList) {
      elem.classList.toggle(CSS.block.red);
      elem.classList.toggle(CSS.block.green);
    }
  }

  setCounters(counters: CountersValue) {
    const {
      total,
      totalSelected,
      totalSelectedRed,
      totalSelectedGreen
    } = counters;
    this.$counters.total.textContent = total.toString();
    this.$counters.totalSelected.textContent = totalSelected.toString();
    this.$counters.totalSelectedRed.textContent = totalSelectedRed.toString();
    this.$counters.totalSelectedGreen.textContent = totalSelectedGreen.toString();
  }

  bindAddItem(callback: () => void) {
    $on(this.$btn, "click", callback);
  }
  bindAddComplexItem(callback: () => void) {
    $on(this.$btnComplex, "click", callback);
  }

  bindListClickHandler(callback: (id: string, ACTION: string) => void) {
    $on(this.$container, "click", this.clickHander.bind(this, callback));
  }

  bindListDoubleClickHandler(callback: () => void) {
    $on(this.$container, "dblclick", this.clickHander.bind(this, callback));
  }

  private renderBox(item: ItemValue) {
    const { id, state } = item;

    const figure = document.createElement("figure");
    figure.classList.add(CSS.block.name);
    if (item.isComplex) {
      figure.classList.add(CSS.block.complex);
      figure.classList.add(CSS.block.red);
    }
    figure.dataset.id = id.toString();

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add(CSS.block.text);
    figcaption.dataset.id = id.toString();
    figcaption.textContent = String(id);

    const button = document.createElement("button");
    button.classList.add(CSS.block.button);
    button.dataset.id = id.toString();
    button.textContent = "x";

    figure.appendChild(figcaption);
    figure.appendChild(button);

    return figure;
  }
}
