import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import useSWR from "swr";

import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { getLeadMagnets } from "@/api/services/adsService";

interface LeadMagnet {
  title: string;
  content: string;
  proposition: string;
  format: string;
}

interface AdsLeadMagnetSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors;
  loading: boolean;
}

const AdsLeadMagnetSelector: React.FC<AdsLeadMagnetSelectorProps> = ({
  control,
  errors,
  loading,
}) => {
  const { data = [] } = useSWR<LeadMagnet[]>("/lm", getLeadMagnets);

  const items = data.map((o, i) => (
    <MenuItem
      key={`${o.title}-${i}`}
      value={`Content: ${o.content}|||Proposition: ${o.proposition}|||Format: ${o.format}`}
    >
      {o.title}
    </MenuItem>
  ));

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <Typography variant="subtitle1" gutterBottom>
        Select Lead Magnet
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <Controller
          name="lm"
          control={control}
          render={({ field }) => (
            <Select disabled={loading} {...field} error={!!errors.lm}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items}
            </Select>
          )}
        />
        {typeof errors.lm?.message === "string" && (
          <Typography color="error">{errors.lm.message}</Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default AdsLeadMagnetSelector;
