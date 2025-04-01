import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoaderProvider } from "./services/LoaderContext.tsx";
import Loader from "./components/common/Loader/loader.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <LoaderProvider>
      <Loader />
      <App />
    </LoaderProvider>
    </Provider>
  </StrictMode>
);
