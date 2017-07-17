import "./styles/index.less";
import { $on } from "./helpers";
import App from "./app";

declare const PROD: boolean;

$on(document, "DOMContentLoaded", () => {
  const app = new App();
});
