import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import useSWR from "swr";

import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { getOffers } from "@/api/services/adsService";

interface AdsOfferSelectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors;
  loading: boolean;
}

const AdsOfferSelector: React.FC<AdsOfferSelectorProps> = ({
  control,
  errors,
  loading,
}) => {
  const { data = [] } = useSWR("/offers", getOffers);

  const items = data.map((offer: { title: string }, index: number) => (
    <MenuItem key={offer.title + index} value={offer.title}>
      {offer.title}
    </MenuItem>
  ));

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <Typography variant="subtitle1" gutterBottom>
        Select Offer
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <Controller
          name="offerOld"
          control={control}
          render={({ field }) => (
            <Select disabled={loading} {...field} error={!!errors.offer}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items}
            </Select>
          )}
        />
        {typeof errors.offer?.message === "string" && (
          <Typography color="error">{errors.offer.message}</Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default AdsOfferSelector;
