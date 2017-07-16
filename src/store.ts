import { Color, RED, GREEN } from "./constants";

export interface ItemValue {
  id: number;
  isComplex: boolean;
  isSelected: boolean;
  state?: Color;
}

interface BoxesValue {
  [key: string]: {
    isComplex: boolean;
    isSelected: boolean;
    state?: Color;
  };
}

export interface CountersValue {
  total: number;
  totalSelected: number;
  totalSelectedRed: number;
  totalSelectedGreen: number;
}

export default class Store {
  boxes: BoxesValue;

  constructor() {
    this.boxes = Object.create(null);
  }

  insert(isComplex: boolean, callback: (obj: ItemValue) => void) {
    const obj: ItemValue = {
      id: Date.now(),
      isSelected: false,
      isComplex: isComplex
    };
    if (isComplex) {
      obj.state = RED;
    }
    this.boxes[obj.id] = obj;
    callback(obj);
  }

  remove(id: string, callback: () => void) {
    delete this.boxes[id];
    callback();
  }

  toggleSelect(id: string, callback: () => void) {
    this.boxes[id].isSelected = !this.boxes[id].isSelected;
    callback();
  }

  switch(id: string, callback: () => void) {
    const state = this.boxes[id].state;
    const newState = state === RED ? GREEN : RED;
    this.boxes[id].state = newState;
    callback();
  }

  count(callback: (counters: CountersValue) => void) {
    let total = 0;
    let totalSelected = 0;
    let totalSelectedRed = 0;
    let totalSelectedGreen = 0;

    for (let key in this.boxes) {
      total++;
      const item = this.boxes[key];
      if (item.isSelected) {
        totalSelected++;

        if (item.isComplex && item.state === RED) {
          totalSelectedRed++;
        }

        if (item.isComplex && item.state === GREEN) {
          totalSelectedGreen++;
        }
      }
    }
    callback({ total, totalSelected, totalSelectedRed, totalSelectedGreen });
  }
}
