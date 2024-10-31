import { getColor } from "@/utils/getColor";

const colors = {
  red: getColor("red"),
};

const styleObj = {
  styleOverrides: {
    root: {
      color: colors.red, // Color for text in label
      fontSize: "1rem",
      "&.Mui-focused": {
        color: colors.red,
        fontWeight: "bold", // Color in label in focus
      },
    },
  },
};

export default styleObj;
