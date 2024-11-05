import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getColor } from "@/utils/getColor";
import Grid from "@mui/material/Grid2";

import officeBoy from "../../assets/images/cartoon-office-boy.png";
import officeGirl from "../../assets/images/cartoon-office-girl.png";
import DrawerPersFormDetails from "./DrawerPersFormDetails";
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

interface UserFormSelectProps {
  person: any; 
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  setSteps: React.Dispatch<React.SetStateAction<number | null>>;
  steps: number | null;
}

const colors = {
  white: getColor("white"),
  orange: getColor("orange"),
  mainGreen: getColor("mainGreen"),
};

const UserFormSelect: React.FC<UserFormSelectProps> = ({
  person,
  selectedValues,
  setSelectedValues,
  setSteps,
}) => {
  const [details, setDetails] = useState<boolean | null>(null);

  const detailsHandler = () => {
    setDetails(true);
  };

  const onSelectChange = (selected: boolean, name: string) => {
    if (name === "Select all") {
      setSelectedValues(selected ? [...ADD_DATA] : []);
    } else {
      if (selected) {
        setSelectedValues((prev) => [...prev, name]);
      } else {
        setSelectedValues((prev) => prev.filter((v) => v !== name));
      }
    }
  };

  const nextStepHandler = () => {
    setSteps(null);
    setTimeout(() => setSteps((prev) => (prev ? prev + 1 : null)), 350);
  };

  useEffect(() => {
    setSelectedValues([]);
  }, [person, setSelectedValues]);

  const checkboxes = ADD_DATA.map((i) => (
    <Grid size={6} key={i} sx={{ textAlign: "left", paddingLeft: "3rem" }}>
      <FormControlLabel
        sx={{
          "& .MuiFormControlLabel-label": {
            color: colors.white,
          },
        }}
        control={
          <Checkbox
            label={i}
            sx={{
              color: colors.orange,
              "&.Mui-checked": {
                color: colors.orange,
              },
            }}
            name={i}
            checked={selectedValues.includes(i)}
            onChange={(event) =>
              onSelectChange(event.target.checked, event.target.name)
            }
          />
        }
        label={i}
        color={"primary"}
      />
    </Grid>
  ));

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: ".8rem",
        textAlign: "center",
        padding: ".8rem .3rem",
      }}
    >
      <PersonCardHead
        place={person.fields?.["Place of residence"] || "Unknown"}
        image={
          person.fields?.["User Image"]?.length > 0
            ? person.fields["User Image"][0]?.url
            : person.fields?.["Gender"] === "Female"
            ? officeGirl
            : officeBoy
        }
        name={person.fields?.["Name"] || "Unnamed"}
        age={person.fields?.["Age"] || "N/A"}
        work={person.fields?.["Job title"] || "No Title"}
      />
      <FormGroup>
        <Grid container spacing={1} flexWrap>
          {checkboxes}
          <Grid
            size={6}
            key={"all"}
            sx={{ textAlign: "left", paddingLeft: "3rem" }}
          >
            <FormControlLabel
              key={"Select all"}
              sx={{
                justifyContent: "center",
                "& .MuiFormControlLabel-label": {
                  color: colors.mainGreen,
                },
              }}
              control={
                <Checkbox
                  sx={{
                    color: colors.orange,
                    "&.Mui-checked": {
                      color: colors.orange,
                    },
                  }}
                  name={"Select all"}
                  checked={selectedValues.length === ADD_DATA.length}
                  onChange={(event) =>
                    onSelectChange(event.target.checked, event.target.name)
                  }
                />
              }
              label={"Select all"}
              color={"primary"}
            />
          </Grid>
        </Grid>
      </FormGroup>
      <Box mt={7}>
        <Button onClick={detailsHandler} variant={"outlined"} color={"info"}>
          Details
        </Button>
      </Box>
      <DrawerPersFormDetails
        person={person}
        setDetails={setDetails}
        details={details}
      />
      <DialogActions sx={{ marginTop: "3rem" }}>
        <Button
          onClick={nextStepHandler}
          variant={"contained"}
          color={"primary"}
          sx={{ width: "100%" }}
        >
          Next step
        </Button>
      </DialogActions>
    </Box>
  );
};

export default UserFormSelect;