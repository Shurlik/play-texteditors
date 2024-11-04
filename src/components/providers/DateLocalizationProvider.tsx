"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import theme from "@/constants/theme";

const DateLocalizationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LocalizationProvider>
  );
};

export default DateLocalizationProvider;
