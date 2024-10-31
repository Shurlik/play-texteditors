import { getColor } from "@/utils/getColor";

const colors = {
  orange: getColor("orange"),
  white: getColor("white"),
  mainGreen: getColor("mainGreen"),
};

const styleObj = {
  styleOverrides: {
    root: {
      alignItems: "center",
      borderRadius: ".4rem",
      padding: ".6rem 1rem",
      "&:hover": {
        backgroundColor: colors.orange, // Save color for hover
      },
      "&.Mui-selected": {
        backgroundColor: colors.mainGreen, // Background color for selected
        color: colors.white,
        // borderColor: colors.white,
        "&:hover": {
          backgroundColor: colors.orange, // Save color for selected
        },
      },
    },
  },
};

export default styleObj;
