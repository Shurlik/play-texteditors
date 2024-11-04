import React, { forwardRef, Ref } from "react";

import { Box, TextField } from "@mui/material";
import { getColor } from "@/utils/getColor";

import FormattedTextDisplayOutline from "../services/FormattedTextDisplayOutline";
import PageHeader from "./PageHeader";

// Define the props interface
interface OutputsTextFieldProps {
  value: string;
  title: string;
  loading: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editable: boolean;
}

const colors = {
  white: getColor("white"),
  orange50: getColor("orange50"),
};

const OutputsTextField = forwardRef<HTMLDivElement, OutputsTextFieldProps>(
  ({ value, title, loading, onChange, editable }, ref: Ref<HTMLDivElement>) => {
    return (
      <Box sx={{ width: "100%" }}>
        <PageHeader header={title} sx={{ flexGrow: "1" }} />
        {editable ? (
          <TextField
            sx={{
              width: "100%",
              "& .MuiInputBase-input": {
                padding: "8px",
              },
            }}
            variant="outlined"
            multiline
            rows={25}
            required
            disabled={loading}
            value={value}
            onChange={onChange}
          />
        ) : (
          <Box
            ref={ref}
            sx={{
              backgroundColor: colors.white,
              padding: "24px",
              borderRadius: "1rem",
              maxHeight: "50vh",
              minHeight: "300px",
              border: `1px solid ${colors.orange50}`,
              overflow: "auto",
              position: "relative",
            }}
          >
            <FormattedTextDisplayOutline>{value}</FormattedTextDisplayOutline>
          </Box>
        )}
      </Box>
    );
  }
);

// Set display name for better debugging
OutputsTextField.displayName = "OutputsTextField";

export default OutputsTextField;
