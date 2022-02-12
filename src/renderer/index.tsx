import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import persistStore from 'redux-phoenix';

persistStore(store, {
  blacklist: ["settings"]
}).then((store: any) => {render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);});
