import { getColor } from "@/utils/getColor";

const colors = {
  black: getColor("black"),
  white: getColor("white"),
  whiteGrey: getColor("whiteGrey"),
  darkGrey42: getColor("darkGrey42"),
  orange50: getColor("orange50"),
  darkGrayMain: getColor("darkGrayMain"),
  background: getColor("background"),
  backgroundMain: getColor("backgroundMain"),
  blackPermanet: getColor("blackPermanent"),
  grey: getColor("grey"),
  orange: getColor("orange"),
};

export const inputOutlinedStyles = {
  
  styleOverrides: {
    root: {
      backgroundColor: "#FFF",

      padding: "16px",
      borderRadius: "8px",
      // "& .MuiSelect-select": {
      //   background: colors.orange,
      // },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.orange50,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.orange,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.orange,
      },
      "& .MuiInputBase-input::placeholder": {
        color: colors.darkGrayMain, // Change color to dark
      },
    },
    input: {
      color: colors.blackPermanet,
      padding: 0,
      fontSize: "16px",
      "&::placeholder": {
        color: colors.darkGrayMain, // Change color to dark
      },
    },
  },
};

export const inputStyles = {
  styleOverrides: {
    root: {
      backgroundColor: colors.background,
      "& .MuiInput-root": {
        color: colors.white, // Color for text
        "&::before": {
          borderBottom: `1px solid ${colors.grey}`, // Color for bottom line
        },
        "&:hover:not(.Mui-disabled)::before": {
          borderBottom: `1px solid ${colors.orange}`, // Color for hover
        },
        "&::after": {
          borderBottom: `1px solid ${colors.orange}`, // Color for focus
        },
      },
      "& .MuiInput-input::placeholder": {
        color: colors.grey, // Color for placeholder
        opacity: 1, // Opacity for the placeholder
      },
    },
  },
};
