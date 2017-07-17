import "./styles/index.less";
import { $on } from "./helpers";
import App from "./app";

$on(document, "DOMContentLoaded", () => {
  const app = new App();
});
