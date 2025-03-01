import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render as rtlRender, RenderOptions, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ReactElement } from "react";

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
      </Provider>
    ),
    ...options,
  });

export { customRender as render, screen };