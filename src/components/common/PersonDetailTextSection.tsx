import React from "react";

import { Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { loginInputStyles } from "@/constants/theme/inputStyles";
import { getColor } from "@/utils/getColor";

import FormattedTextDisplay from "../services/FormattedTextDisplayPersDetails";

interface PersonDetailTextSectionProps {
  title: string;
  subtitles: string[];
  content: Record<string, string | number | undefined>;
  isEditing: boolean;
  onChange: (key: string, value: string | number) => void;
}

const fieldTypes: Record<string, "number" | "select" | "multiline" | "text"> = {
  Age: "number",
  "Number of Kids": "number",
  Gender: "select",
  Description: "multiline",
  Fears: "multiline",
  "Buying Barriers": "multiline",
  "Buying Motives": "multiline",
  "Buying Behavior": "multiline",
  "Brand-Magnet": "multiline",
  "Brand-Examples": "multiline",
  "Online behavior": "multiline",
  "Device usage": "multiline",
  "Preferred communication channels": "multiline",
  "Emotional Win": "multiline",
  "Materialistic Gains": "multiline",
  "Elevator Pitch": "multiline",
  "Goals and Dreams": "multiline",
  "Magical Solution": "multiline",
  "Important Values": "multiline",
  "Pain Points": "multiline",
  "Empathy Card": "multiline",
};

const colors = {
  mainGreen: getColor("mainGreen"),
  darkGrey42: getColor("darkGrey42"),
  gray40: getColor("gray40"),
  silverCA: getColor("silverCA"),
  white: getColor("white"),
  orange: getColor("orange"),
};

const PersonDetailTextSection: React.FC<PersonDetailTextSectionProps> = ({
  title,
  subtitles,
  content,
  isEditing,
  onChange,
}) => {
  return (
    <Box
      sx={{
        marginTop: ".5rem",
        paddingBottom: "1.2rem",
      }}
    >
      <Typography variant={"h5"} sx={{ color: colors.mainGreen }}>
        {title}
      </Typography>
      {subtitles.map((s) => {
        const fieldType = fieldTypes[s] || "text";

        return (
          <Box
            key={s}
            sx={{
              borderBottom: `1px solid ${colors.darkGrey42}`,
              padding: ".8rem .5rem",
              marginTop: ".3rem",
              color: colors.silverCA,
            }}
          >
            <Typography
              sx={{
                color: colors.white,
                fontSize: "1rem",
                fontWeight: "bold",
                display: "inline",
              }}
            >
              {s}:&nbsp;&nbsp;&nbsp;
            </Typography>
            {isEditing ? (
              fieldType === "multiline" ? (
                <TextField
                  variant="standard"
                  multiline
                  minRows={3}
                  value={content[s] || ""}
                  onChange={(e) => onChange(s, e.target.value)}
                  sx={{
                    width: "100%",
                    marginTop: "0.5rem",
                    ...loginInputStyles,
                  }}
                />
              ) : fieldType === "number" ? (
                <TextField
                  variant="standard"
                  type="number"
                  value={content[s] || ""}
                  onChange={(e) => onChange(s, e.target.value)}
                  sx={{
                    width: "100%",
                    marginTop: "0.5rem",
                    ...loginInputStyles,
                  }}
                />
              ) : fieldType === "select" ? (
                <Select
                  sx={{
                    marginTop: "0.5rem",
                    width: "50%",
                    border: `1px solid ${colors.gray40}`,
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    "& .MuiSelect-icon": {
                      color: colors.orange,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.gray40,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      // Optional hover effect
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: colors.orange,
                    },
                  }}
                  labelId="demo-simple-select-label"
                  value={content[s] || ""}
                  onChange={(e) => onChange(s, e.target.value)}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
                </Select>
              ) : (
                <TextField
                  variant="standard"
                  value={content[s] || ""}
                  onChange={(e) => onChange(s, e.target.value)}
                  sx={{
                    width: "100%",
                    marginTop: "0.5rem",
                    ...loginInputStyles,
                  }}
                />
              )
            ) : !!content[s] ? (
              <FormattedTextDisplay custom={colors.silverCA}>
                {`${content[s]}`}
              </FormattedTextDisplay>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: colors.silverCA,
                  display: "inline",
                  marginLeft: "0.5rem",
                }}
              >
                No data
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default PersonDetailTextSection;