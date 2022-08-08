import App from "./App.svelte";

import "./styles/index.scss";
import * as M from "materialize-css/dist/js/materialize";

// init material plugins
M.AutoInit();

const app = new App({
  target: document.body,
});

export default app;
