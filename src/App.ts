import Controller from "./controller";

interface PropsValue {
    test: string;
}

export default class App {
  private test: string;
  private controller: Controller;

  constructor(propsObj: PropsValue) {
    this.test = propsObj.test;
    //console.log(this.test);
    this.controller = new Controller()
  }
}

////

export class Hand {
    private render:Render;

    constructor(render:Render){
        this.render = render;
    }

    public view(){
        this.render.test();
    }
}

export class Render {
    private hand:Hand;

    public method(){
        this.hand = new Hand(this);
    }

    public test(){
    }
}

let render = new Render();

