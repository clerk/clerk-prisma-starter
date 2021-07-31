import { extendTheme } from "@chakra-ui/react";

export const defaultTheme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Raleway",
  },
  colors: {
    brand: {
      green: "#1ec932",
      red: "#f82b60",
    },
  },
});
