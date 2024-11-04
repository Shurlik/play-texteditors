import React from "react";

import { Box, Drawer, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";
import officeBoy from "@/images/cartoon-office-boy.png";
import officeGirl from "@/images/cartoon-office-girl.png";

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
  person: Person;
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
          place={person.fields["Place of residence"]}
          image={
            person.fields["User Image"]?.length
              ? (person.fields["User Image"][0].url as string) // Cast to string
              : person.fields["Gender"] === "Female"
              ? officeGirl // Cast to string
              : officeBoy // Cast to string
          }
          name={person.fields["Name"]}
          age={person.fields["Age"]}
          work={person.fields["Job title"]}
          small
        />
        <Box>
          {ADD_DATA.map((d) => (
            <Box key={d} sx={{ marginTop: "1rem" }}>
              <Typography variant="h5" sx={{ color: colors.orange }}>
                {d}
              </Typography>
              <FormattedTextDisplay custom={colors.white}>
                {person.fields[d]}
              </FormattedTextDisplay>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerPersFormDetails;
