import "./styles/index.less";
import { $on } from "./helpers";
import App from "./app";

declare const PROD: boolean;

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});
