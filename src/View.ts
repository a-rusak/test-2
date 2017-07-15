import Store from "./Store";
import { $$, $on } from "./helpers";

export default class View {
  private store: Store;
  private $btn: Element;

  constructor(store: Store) {
    console.log("View");
    this.store = store;
    this.$btn = $$("#btn");
    //$on(this.$btn, "click", this.clickHadler.bind(this));
  }

  public add() {
    this.store.update();
  }

  public remove() {}

  customEventHandler() {
    console.log("customEventHandler");
  }

	public bindAddItem(callback: () => void) {
		$on(this.$btn, 'click', callback);
	}
}
