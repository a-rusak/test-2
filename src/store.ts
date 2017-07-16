interface itemValue {
  id: number;
  isComplex: boolean;
  isSelected: boolean;
}

interface boxesValue {
  [key: string]: {
    isComplex: boolean;
    isSelected: boolean;
  };
}

export default class Store {
  //private boxes: Array<itemValue>;
  //private boxes: itemValue2
  public boxes: boxesValue = Object.create(null);

  constructor() {
    console.log("Store");
    this.boxes = Object.create(null);
  }

  find() {}

  public update() {
    console.log("Store update");
  }

  insert(item: itemValue, callback: () => void) {
    this.boxes[item.id] = {
      isComplex: item.isComplex,
      isSelected: item.isSelected
    };
    //console.log(this.boxes);
    callback && callback();
  }

  remove(id: string, callback: () => void) {
    delete this.boxes[id];
    //console.log(this.boxes);
    callback && callback();
  }

  toggleSelect(id: string, callback: () => void) {
    this.boxes[id].isSelected = !this.boxes[id].isSelected;
    //console.log(this.boxes);
    callback && callback();
  }

  count() {}
}
