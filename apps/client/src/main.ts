// @ts-ignore - false positive?
import App from "./App.svelte";
import "./styles/index.scss";

// init material plugins
import * as M from "materialize-css/dist/js/materialize";
M.AutoInit();


const app = new App({
  target: document.body,
});

export default app;
