import Store from "./Store";
import { $$, $on } from "./helpers";
import { CSS } from "./constants";
//import itemValue from "./store"

interface itemValue {
  id: number;
  isComplex: boolean;
}

export default class View {
  private store: Store;
  private $btn: Element;
  private $container: Element;

  constructor(store: Store) {
    console.log("View");
    this.store = store;
    this.$btn = $$(`.${CSS.addButton}`);
    this.$container = $$(`.${CSS.container}`);
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

  public bindAddItem(callback: () => void) {
    $on(this.$btn, "click", callback);
  }

  public bindListClickHandler(callback: () => void) {
    //$on(this.$container, "click", this.getTarget.bind(this));
    $on(this.$container, "click", callback);
    //callback(id)
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
