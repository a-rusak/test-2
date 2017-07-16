interface itemValue {
  id: number;
  isComplex: boolean;
}

interface boxesValue {
  [key: string]: {
    isComplex: boolean;
  };
}

export default class Store {
  //private boxes: Array<itemValue>;
  //private boxes: itemValue2
  private boxes: boxesValue = Object.create(null);

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
      isComplex: item.isComplex
    };
    console.log(this.boxes);
    callback && callback();
  }

  remove(id: string, callback: () => void) {
    delete this.boxes[id];
    console.log(this.boxes);
    callback && callback();
  }

  count() {}
}
