import { getColor } from "@/utils/getColor";

const colors = {
  white: getColor("white"),
  darkGrey42: getColor("darkGrey42"),
};
// styleTableHeadd
export const tableHead = {
  styleOverrides: {
    root: {
      fontWeight: "bold",
      color: colors.white,
    },
  },
};

// Style for TableRow
export const tableRow = {
  styleOverrides: {
    root: {
      color: colors.white,
      "&:nth-of-type(odd)": {},
      "&:hover": {},
    },
  },
};

// Style for TableCell
export const tableCell = {
  styleOverrides: {
    root: {
      borderBottom: `1px solid ${colors.darkGrey42}`,
      color: colors.white,
      fontSize: "1rem",
      fontWeight: "400",
    },
    head: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      // color: '#333',
    },
  },
};
