import Store from "./Store";
import { $$, $on } from "./helpers";
import { CSS } from "./constants";
//import itemValue from "./store"

interface itemValue {
  id: number;
  isComplex: boolean;
}

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

export default class View {
  private store: Store;
  private $btn: Element;
  private $container: Element;

  constructor(store: Store) {
    //console.log("View");
    this.store = store;
    this.$btn = $$(`.${CSS.addButton}`);
    this.$container = $$(`.${CSS.block.container}`);
    //this.template = renderBox(item);
  }

  /* public add() {
    this.store.update();
  } */
  public addItem(item: itemValue) {
    this.$container.appendChild(this.renderBox(item));
  }

  public remove(id: string) {
    const elem = $$(`figure[data-id="${id}"]`, this.$container);
    this.$container.removeChild(elem);
  }

  clickHander(callback: (id: string, ACTION: string) => void, event: DatasetEvent) {
    const target = event.target;
    const id = target.dataset.id;
    let ACTION: string = "";
    //console.log(target);

    if (!target || !id) return;
    //event.cancelBubble = true;

    if (target.classList.contains(CSS.block.button)) {
      ACTION = "DELETE";
    }
    if (target.classList.contains(CSS.block.name) || target.classList.contains(CSS.block.text)) {
      if (event.type === "dblclick") {
        ACTION = "SWITCH";
      } else {
        ACTION = "SELECT";
      }
    }
    callback(id, ACTION);
  }

  public toggleSelect(id: string, isSelected: boolean) {
    const selector = `figure[data-id="${id}"], figcaption[data-id="${id}"]`
    const elem = $$(selector, this.$container);
    //console.log(elem)
    elem && elem.classList && elem.classList.toggle(CSS.block.selected, isSelected)
    /* const range = document.createRange();
    range.selectNodeContents(referenceNode);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range); */
    //console.log(id, range);
  }


  public bindAddItem(callback: () => void) {
    $on(this.$btn, "click", callback);
  }

  public bindListClickHandler(callback: (id: string, ACTION: string) => void) {
    $on(this.$container, "click", this.clickHander.bind(this, callback));
  }

  public bindListDoubleClickHandler(callback: () => void) {
    $on(this.$container, "dblclick", this.clickHander.bind(this, callback));
  }

  renderBox(item: itemValue) {
    const id = String(item.id);

    const figure = document.createElement("figure");
    figure.classList.add(CSS.block.name);
    figure.dataset.id = id;

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add(CSS.block.text);
    figcaption.dataset.id = id;
    figcaption.textContent = String(id);

    const button = document.createElement("button");
    button.classList.add(CSS.block.button);
    button.dataset.id = id;
    button.textContent = "x";

    figure.appendChild(figcaption);
    figure.appendChild(button);

    return figure;
    /* `
      <figure class="${CSS.block.name}">
        <figcaption class="${CSS.block.text}">${item.id}</figcaption>
        <button class="${CSS.block.button}">x</button>
      </figure>
    `; */
  }
}
