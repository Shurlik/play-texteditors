import Image from "next/image";
import React from "react";

import { Box, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import female from "../../assets/images/female.png";
import male from "../../assets/images/male.png";
import nog from "../../assets/images/nog.png";

interface GenderButtonProps {
  onClick: (gender: string) => void;
  selected: boolean;
  gender: "Male" | "Female" | "Non-Binary";
  disabled?: boolean;
}

const colors = {
  darkGreen08: getColor("darkGreen08"),
  mainGreen: getColor("mainGreen"),
  blackLighter: getColor("blackLighter"),
  green2E_20: getColor("green2E_20"),
  white: getColor("white"),
};

const GenderButton: React.FC<GenderButtonProps> = ({
  onClick,
  selected,
  gender,
  disabled,
}) => {
  let selectedGender = "";
  let selectedIcon = null;

  if (gender === "Male") {
    selectedGender = "Male";
    selectedIcon = male; // Use the imported image directly
  } else if (gender === "Female") {
    selectedGender = "Female";
    selectedIcon = female; // Use the imported image directly
  } else if (gender === "Non-Binary") {
    selectedGender = "Non-Binary";
    selectedIcon = nog; // Use the imported image directly
  }

  const clickHandler = () => {
    if (disabled) {
      return;
    }
    onClick(gender);
  };

  return (
    <Box
      sx={{
        opacity: disabled ? 0.5 : 1,
        cursor: "pointer",
        borderRadius: "1rem",
        padding: "1rem",
        textAlign: "center",
        backgroundColor: selected ? colors.darkGreen08 : colors.blackLighter,
        border: `1px solid ${selected ? colors.mainGreen : colors.green2E_20}`,
        position: "relative",
        flexBasis: "10rem",
        transition: ".3s",
        "&:hover": {
          backgroundColor: colors.darkGreen08,
          border: `1px solid ${colors.mainGreen}`,
        },
      }}
      onClick={clickHandler}
    >
      <Box sx={{ height: "64px", position: "relative", width: "64px" }}>
        {selectedIcon && (
          <Image
            alt="gender"
            src={selectedIcon}
            layout="fill"
            objectFit="contain"
          />
        )}
      </Box>
      <Typography
        sx={{
          color: colors.white,
          fontWeight: "600",
          marginTop: "5px",
        }}
      >
        {selectedGender}
      </Typography>
      {selected && (
        <CheckCircleOutlineIcon
          sx={{
            width: "18px",
            height: "18px",
            color: colors.mainGreen,
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
        />
      )}
    </Box>
  );
};

export default GenderButton;
