import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./context/store";
import { ThemeContextProvider } from "./context/themeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </PersistGate>
  </Provider>
);
