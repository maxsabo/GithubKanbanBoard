import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider value={defaultSystem}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
