import React from "react";

import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { AssistantSelectorProps } from "@/interfaces/components/services.interface";
import { getColor } from "@/utils/getColor";

const AssistantSelector: React.FC<AssistantSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: getColor("white"),
        }}
      >
        Model:
      </Typography>
      <FormControl
        sx={{
          width: "13rem",
        }}
      >
        <Select
          value={value}
          label="Assistant"
          onChange={onChange}
          defaultValue={"gpt"}
        >
          <MenuItem value={"gpt"}>Chat GPT</MenuItem>
          <MenuItem value={"claude"}>Claude</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AssistantSelector;
