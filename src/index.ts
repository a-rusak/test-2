import "./styles/index.less";
import { $on } from "./helpers";
import App from "./App";

declare const PROD: boolean;

document.addEventListener('DOMContentLoaded', () => {
  !PROD && console.log('DOMContentLoaded')
  !PROD && document.body.classList.add('u-debug')
  const app = new App({ test: "App" });
});
