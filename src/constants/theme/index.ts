import { createTheme, ThemeOptions } from "@mui/material/styles";
import { getColor } from "@/utils/getColor";

import buttons from "./buttons";
import { inputOutlinedStyles, inputStyles } from "./inputs";
import labels from "./labels";
import listItemButton from "./listItemButton";
import { menu } from "./menu";
import { customSelect, customSelectItem, customSelectMenu } from "./select";
import { tableCell, tableHead, tableRow } from "./table";

const colors = {
  white: getColor("white"),
  gray: getColor("gray"),
};

// Define the theme options type
const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      "Inter",
      "Rajdhani",
      "Bebas Neue",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 400,
      fontFamily: "Bebas Neue",
    },
    h2: {
      fontWeight: 400,
      fontFamily: "Bebas Neue",
      letterSpacing: 5,
    },
    h3: {
      fontFamily: "Bebas Neue",
      fontWeight: 400,
    },
    h4: {
      fontWeight: 400,
      fontFamily: "Bebas Neue",
    },
    h5: {
      fontSize: "1.5rem",
      fontFamily: "Bebas Neue",
      letterSpacing: 3,
      fontWeight: 400,
    },
    h6: {
      fontWeight: 600,
      color: colors.white,
      padding: 0,
      margin: 0,
      lineHeight: 1,
    },
    body1: {
      fontWeight: 500,
      fontSize: "1rem",
      color: colors.gray,
    },
    body2: {},
    subtitle1: {
      color: colors.white,
    },
  },
  components: {
    MuiInput: inputStyles,
    MuiOutlinedInput: inputOutlinedStyles,
    MuiInputLabel: labels,
    MuiButton: buttons,
    MuiListItemButton: listItemButton,
    MuiTableHead: tableHead,
    MuiTableRow: tableRow,
    MuiTableCell: tableCell,
    MuiMenu: menu,
    MuiMenuItem: customSelectItem,
    MuiSelect: {
      ...customSelect,
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: customSelectMenu.styleOverrides.paper,
          },
        },
      },
    },
  },
};

// Create the theme using the options defined
const theme = createTheme(themeOptions);

export default theme;
