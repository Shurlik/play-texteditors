import { getColor } from "@/utils/getColor";

const colors = {
  orange: getColor("orange"),
  orange50: getColor("orange50"),
  white: getColor("white"),
  mainGreen: getColor("mainGreen"),
  greenBtn: getColor("greenBtn"),
  black: getColor("black"),
  silverLight: getColor("silverLight"),
  silver: getColor("silver"),
  background: getColor("background"),
};

const styleObj = {
  styleOverrides: {
    root: {
      borderRadius: ".5rem",
      transition: ".2s",
      minWidth: "5rem",
      "&.Mui-disabled": {
        backgroundColor: "#ccc", // Background for disabled button
        color: "#666", // Color for disabled button
      },
    },
    containedPrimary: {
      letterSpacing: 2,
      backgroundColor: colors.orange, // Background with default color
      color: colors.white,
      padding: ".6rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: colors.mainGreen,
        border:"none",
        boxShadow: "none",
        color: colors.black, // Color with hover effect
      },
    },
    outlinedPrimary: {
      color: colors.silverLight,
      border: `1px solid ${colors.mainGreen}`,
      padding: ".6rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: colors.mainGreen,
        borderColor: colors.mainGreen,
        color: colors.black,
        border: `1px solid ${colors.silver}`,
      },
    },
    outlinedSecondary: {
      borderColor: colors.orange, // Border color
      color: colors.orange,
      "&:hover": {
        backgroundColor: colors.mainGreen,
        color: colors.black,
        border: `1px solid ${colors.mainGreen}`,
      },
      "&:disabled": {
        color: colors.orange50,
        border: `1px solid ${colors.orange50}`,
        backgroundColor: colors.background,
      },
    },
    outlinedInfo: {
      color: colors.orange,
      border: `1px solid ${colors.orange}`,
      padding: ".3rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      transition: ".3s",
      "&:hover": {
        backgroundColor: colors.mainGreen,
        borderColor: colors.mainGreen,
        color: colors.black,
        // border: `1px solid ${colors.silver}`,
      },
    },
  },
};

export default styleObj;
