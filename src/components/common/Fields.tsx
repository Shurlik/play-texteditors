import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

import { loginInputStyles } from "@/constants/theme/inputStyles";

interface FieldsProps {
  field: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFieldChange: (field: string, value: any) => void;
  loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

const Fields: React.FC<FieldsProps> = ({
  field,
  handleFieldChange,
  loading,
  value,
}) => {
  switch (field) {
    case "Age":
    case "Number of Kids":
      return (
        <TextField
          sx={loginInputStyles}
          variant="standard"
          disabled={loading}
          key={field}
          type="number"
          value={value}
          onChange={(e) =>
            handleFieldChange(field, parseInt(e.target.value, 10))
          }
          fullWidth
          margin="dense"
        />
      );
    case "Gender":
      return (
        <FormControl margin="dense" key={field}>
          <InputLabel>{field}</InputLabel>
          <Select
            sx={loginInputStyles}
            variant="standard"
            disabled={loading}
            value={value}
            fullWidth
            onChange={(e) => handleFieldChange(field, e.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Non-Binary">Non-Binary</MenuItem>
          </Select>
        </FormControl>
      );
    case "Empathy Card":
    case "Important Values":
    case "Pain Points":
    case "Fears":
    case "Magical Solution":
    case "Goals and Dreams":
    case "Materialistic Gains":
    case "Emotional Win":
    case "Brand-Values":
    case "Brand-Examples":
    case "Brand-Magnet":
    case "Elevator Pitch":
    case "Buying Motives":
    case "Buying Barriers":
    case "Preferred communication channels":
    case "Device usage":
    case "Online behavior":
      return (
        <TextField
          variant="standard"
          sx={loginInputStyles}
          disabled={loading}
          key={field}
          value={value}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          margin="dense"
          multiline
          fullWidth
          rows={field === "Empathy Card" ? 15 : 7}
        />
      );
    default:
      return (
        <TextField
          variant="standard"
          sx={loginInputStyles}
          disabled={loading}
          key={field}
          value={value}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          margin="dense"
          fullWidth
        />
      );
  }
};

export default Fields;
