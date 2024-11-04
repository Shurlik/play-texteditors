import React from "react";

import { Box, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";

interface RenderDetailFieldsProps {
  sectionTitle: string;
  fields: string[];
  selectedPerson: {
    fields: {
      [key: string]: string | undefined;
    };
  };
}

const colors = {
  pink: getColor("pink"),
};

const RenderDetailFields: React.FC<RenderDetailFieldsProps> = ({
  sectionTitle,
  fields,
  selectedPerson,
}) => {
  return (
    <Box key={sectionTitle}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1, color: colors.pink }}>
        {sectionTitle}
      </Typography>
      {fields.map((field) => (
        <Box key={field}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {field}:
          </Typography>
          <Typography variant="body1">
            {selectedPerson.fields[field] || "Not specified"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default RenderDetailFields;
