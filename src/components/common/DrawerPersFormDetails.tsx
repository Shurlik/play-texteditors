import React from "react";

import { Box, Drawer, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";

import officeBoy from "../../assets/images/cartoon-office-boy.png";
import officeGirl from "../../assets/images/cartoon-office-girl.png";
import FormattedTextDisplay from "../services/FormattedTextDisplay";
import PersonCardHead from "./PersonCardHead";

const ADD_DATA = [
  "Limbic Types",
  "Important Values",
  "Pain Points",
  "Fears",
  "Goals and Dreams",
  "Materialistic Gains",
  "Emotional Win",
];

interface PersonFields {
  "Place of residence": string;
  "User Image"?: { url: string }[];
  Gender: "Female" | "Male";
  Name: string;
  Age: number;
  "Job title": string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface Person {
  fields: PersonFields;
}

interface DrawerPersFormDetailsProps {
  person: Person | null; // Ensure person can be null
  setDetails: (details: Person | null) => void;
  details: Person | null;
}

const colors = {
  darkGrey42: getColor("darkGrey42"),
  background: getColor("background"),
  orange: getColor("orange"),
  white: getColor("white"),
};

const DrawerPersFormDetails: React.FC<DrawerPersFormDetailsProps> = ({
  person,
  setDetails,
  details,
}) => {
  // Check if person and its fields are defined
  const fields = person?.fields || {}; // Default to an empty object if person or fields is undefined

  const placeOfResidence = fields["Place of residence"] || "Unknown";
  const userImage =
    fields["User Image"]?.length > 0
      ? fields["User Image"][0].url
      : fields["Gender"] === "Female"
      ? officeGirl
      : officeBoy;
  const name = fields["Name"] || "Unnamed";
  const age = fields["Age"] || "N/A";
  const work = fields["Job title"] || "No Title";

  return (
    <Drawer
      anchor="right"
      open={!!details}
      onClose={() => setDetails(null)}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Box
        sx={{
          width: "30rem",
          borderTop: `1px solid ${colors.darkGrey42}`,
          borderLeft: `1px solid ${colors.darkGrey42}`,
          borderBottom: `1px solid ${colors.darkGrey42}`,
          height: "100%",
          borderRadius: "1rem 0 0 1rem",
          overflow: "auto",
          backgroundColor: colors.background,
          padding: "0 1rem 2rem",
        }}
      >
        <PersonCardHead
          place={placeOfResidence}
          image={userImage}
          name={name}
          age={age}
          work={work}
          small
        />
        <Box>
          {ADD_DATA.map((d) => (
            <Box key={d} sx={{ marginTop: "1rem" }}>
              <Typography variant="h5" sx={{ color: colors.orange }}>
                {d}
              </Typography>
              <FormattedTextDisplay custom={colors.white}>
                {fields[d] || "N/A"} {/* Add fallback for undefined fields */}
              </FormattedTextDisplay>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerPersFormDetails;