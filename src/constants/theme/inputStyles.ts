import { getColor } from "@/utils/getColor";

const colors = {
  white: getColor("white"),
  background: getColor("background"),
  orange: getColor("orange"),
  darkGrey42: getColor("darkGrey42"),
  mainGreen: getColor("mainGreen"),
  orange50: getColor("orange50"),
};

export const loginInputStyles = {
  "& .MuiInputBase-input": {
    color: colors.white,
    backgroundColor: colors.background,
    paddingX: ".3rem",
    paddingY: ".8rem",
    borderRadius: "0",
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    "&:hover": {
      borderBottomWidth: 1,
      borderBottomColor: colors.orange,
    },
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: colors.darkGrey42,
    "&:hover": {
      borderBottomWidth: 1,
      borderBottomColor: colors.mainGreen,
    },
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
  },
  "& .MuiInput-underline:after": {
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
  },
  "& .MuiInputLabel-root": {
    color: colors.white,
    fontSize: "1rem",
    fontWeight: "bold",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: colors.white },
  "& .MuiInputBase-input::placeholder": { color: colors.darkGrey42 },
  "&:hover .MuiInputBase-root": {},
};

export const personsInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: colors.white,
    "& fieldset": {
      borderColor: colors.darkGrey42,
    },
    "&:hover fieldset": {
      borderColor: colors.orange50,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.orange50,
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "black",
  },
};

export const createInputStyles = {
  "& .MuiInputBase-input": {
    color: colors.white,
    "&:hover": {},
  },
  "& .MuiInput-underline:before": {
    "&:hover": {},
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {},
  "& .MuiInput-underline:after": {},
  "& .MuiInputLabel-root": {
    color: colors.white,
    "&:hover": {},
  },
  "& .MuiInputLabel-root.Mui-focused": { color: colors.white },
  "& .MuiInputBase-input::placeholder": { color: colors.white },
  "&:hover .MuiInputBase-root": {},
};
