export const CSS = {
  addButton: "c-add-button--simple",
  addButtonComplex: "c-add-button--complex",

  block: {
    container: "c-block__container",
    name: "c-block",
    complex: "c-block--complex",
    red: "c-block--red",
    green: "c-block--green",
    selected: "c-block--selected",
    text: "c-block__text",
    button: "c-block__button"
  }
};
export const RED: Color = "RED";
export const GREEN: Color = "GREEN";

export type Color = "RED" | "GREEN";

export const DELETE: Action = "DELETE";
export const SWITCH: Action = "SWITCH";
export const SELECT: Action = "SELECT";
export type Action = "DELETE" | "SWITCH" | "SELECT";
