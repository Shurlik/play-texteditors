import React, { useState, MouseEvent } from "react";

import { Box, Checkbox, Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import officeBoy from "@/images/cartoon-office-boy.png";
// import officeGirl from "@/images/cartoon-office-girl.png";

import officeBoy from "../../assets/images/cartoon-office-boy.png";
import officeGirl from "../../assets/images/cartoon-office-girl.png";
import CardSubtitle from "./CardSubtitle";
import DetailItem from "./DetailItem";
import PersonCardHead from "./PersonCardHead";
import SectionTitle from "./SectionTitle";

interface PersonFields {
  Name: string;
  "User Image"?: { url: string }[];
  Gender: "Male" | "Female";
  "Place of residence": string;
  Age: number;
  "Job title": string;
  Industry: string;
  "Career stage": string;
  "Working environment": string;
  "Education level": string;
  "Income class": string;
  "Limbic Types": string;
  Enneagram: string;
  "Myers-Briggs (MBTI)": string;
  DISG: string;
  "Sinus-Milieus": string;
  "Spiral Dynamics": string;
  "Hobbies and Interests": string;
  "TV Shows / Books": string;
  "Important Values": string;
  "Pain Points": string;
  Fears: string;
  "Goals and Dreams": string;
  "Materialistic Gains": string;
  "Emotional Win": string;
  "Brand-Values": string;
  "Brand-Examples": string;
  "Brand Archetype": string;
  "Brand-Magnet": string;
  "Buying Behavior": string;
  "Buying Motives": string;
  "Buying Barriers": string;
  "Preferred communication channels": string;
  "Device usage": string;
  "Online behavior": string;
  "Elevator Pitch": string;
}

interface Person {
  fields: PersonFields;
  id: string;
}

interface PersonCardProps {
  person: Person;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
}

const colors = {
  boxShadowLight: getColor("boxShadowLight"),
  white: getColor("white"),
  gray40: getColor("gray40"),
  black: getColor("black"),
  orange: getColor("orange"),
  orange20: getColor("orange20"),
};

const PersonCard: React.FC<PersonCardProps> = ({
  person,
  isSelected,
  onSelectChange,
}) => {
  const { fields, id } = person;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const detailsHandler = () => {
    // navigate(`/persons/${id}`);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).type !== "checkbox") {
      onSelectChange(id, !isSelected);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: `0px 4px 12px 0px ${colors.boxShadowLight}`,
        borderRadius: "25px",
      }}
    >
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={detailsHandler}
        sx={{
          width: "360px",
          height: "500px",
          perspective: "1000px",
          "& .card-inner": {
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.8s",
            transformStyle: "preserve-3d",
          },
          "&:hover .card-inner": {
            transform: "rotateY(180deg)",
          },
        }}
      >
        <Box className="card-inner">
          {/* Front side */}
          <Box
            sx={{
              boxSizing: "border-box",
              border: `1px solid ${colors.gray40}`,
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              borderTopRightRadius: "25px",
              borderTopLeftRadius: "25px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                backgroundColor: colors.black,
                flexGrow: 3,
                padding: "24px",
                color: colors.white,
                textAlign: "center",
              }}
            >
              <PersonCardHead
                name={fields["Name"]}
                image={
                  fields["User Image"]?.length > 0 &&
                  fields["User Image"][0].url
                    ? fields["User Image"][0].url
                    : fields["Gender"] === "Female"
                    ? officeGirl
                    : officeBoy
                }
                place={fields["Place of residence"]}
              />
              <Typography
                sx={{
                  color: colors.white,
                  marginBottom: "1rem",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  marginTop: "1rem",
                }}
              >
                {"Age: " + fields["Age"] + ", " + fields["Job title"]}
              </Typography>
              <CardSubtitle header="Industry" text={fields["Industry"]} />
              <CardSubtitle
                header="Career stage"
                text={fields["Career stage"]}
              />
              <CardSubtitle
                header="Working environment"
                text={fields["Working environment"]}
              />
              <CardSubtitle
                header="Education level"
                text={fields["Education level"]}
              />
              <CardSubtitle
                header="Income class"
                text={fields["Income class"]}
              />
            </Box>
          </Box>

          {/* Back side */}
          <Box
            sx={{
              cursor: "pointer",
              border: `1px solid ${colors.orange}`,
              boxSizing: "border-box",
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: colors.black,
              borderTopRightRadius: "25px",
              borderTopLeftRadius: "25px",
              padding: "20px 10px 20px 20px",
              color: colors.white,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "10px",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: colors.orange20,
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: colors.orange,
                  borderRadius: "4px",
                },
              }}
            >
              <SectionTitle title="Psychographic Characteristics" />
              <DetailItem label="Limbic Types" value={fields["Limbic Types"]} />
              <DetailItem label="Enneagram" value={fields["Enneagram"]} />
              <DetailItem
                label="Myers-Briggs (MBTI)"
                value={fields["Myers-Briggs (MBTI)"]}
              />
              <DetailItem label="DISG" value={fields["DISG"]} />
              <DetailItem
                label="Sinus-Milieus"
                value={fields["Sinus-Milieus"]}
              />
              <DetailItem
                label="Spiral Dynamics"
                value={fields["Spiral Dynamics"]}
              />
              <DetailItem
                label="Hobbies and Interests"
                value={fields["Hobbies and Interests"]}
              />
              <DetailItem
                label="TV Shows / Books"
                value={fields["TV Shows / Books"]}
              />

              <SectionTitle title="Values and Pain Points" />
              <DetailItem
                label="Important Values"
                value={fields["Important Values"]}
              />
              <DetailItem label="Pain Points" value={fields["Pain Points"]} />
              <DetailItem label="Fears" value={fields["Fears"]} />

              <SectionTitle title="Goals and Gains" />
              <DetailItem
                label="Goals and Dreams"
                value={fields["Goals and Dreams"]}
              />
              <DetailItem
                label="Materialistic Gains"
                value={fields["Materialistic Gains"]}
              />
              <DetailItem
                label="Emotional Win"
                value={fields["Emotional Win"]}
              />

              <SectionTitle title="Brand Preferences" />
              <DetailItem label="Brand-Values" value={fields["Brand-Values"]} />
              <DetailItem
                label="Brand-Examples"
                value={fields["Brand-Examples"]}
              />
              <DetailItem
                label="Brand Archetype"
                value={fields["Brand Archetype"]}
              />
              <DetailItem label="Brand-Magnet" value={fields["Brand-Magnet"]} />

              <SectionTitle title="Buying Behavior" />
              <DetailItem
                label="Buying Behavior"
                value={fields["Buying Behavior"]}
              />
              <DetailItem
                label="Buying motives"
                value={fields["Buying Motives"]}
              />
              <DetailItem
                label="Buying barriers"
                value={fields["Buying Barriers"]}
              />

              <SectionTitle title="Media Usage" />
              <DetailItem
                label="Preferred communication channels"
                value={fields["Preferred communication channels"]}
              />
              <DetailItem label="Device usage" value={fields["Device usage"]} />
              <DetailItem
                label="Online behavior"
                value={fields["Online behavior"]}
              />

              <SectionTitle title="Elevator Pitch" />
              <DetailItem
                label="Elevator Pitch"
                value={fields["Elevator Pitch"]}
              />

              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  margin: "0 auto",
                  width: "7rem",
                  borderRadius: "10px",
                  display: "flex",
                  gap: ".4rem",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.gray40,
                  padding: ".3rem",
                  marginTop: "1.5rem",
                  cursor: "pointer",
                }}
              >
                <BorderColorIcon sx={{ color: colors.white }} />
                <Typography
                  sx={{
                    color: colors.white,
                    fontSize: ".9rem",
                    fontWeight: "700",
                  }}
                >
                  Modify
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
				onClick={handleClick}
				sx={{
					overflow: 'hidden',
					boxSizing: 'border-box',
					borderBottom: `1px solid ${isHovered ? colors.orange : colors.gray40}`,
					borderLeft: `1px solid ${isHovered ? colors.orange : colors.gray40}`,
					borderRight: `1px solid ${isHovered ? colors.orange : colors.gray40}`,
					borderBottomRightRadius: '25px',
					borderBottomLeftRadius: '25px',
					width: '360px',
					display: 'flex',
					textAlign: 'center',
					transition: 'border-color .8s, background-color .3s',
					cursor: 'pointer',
					userSelect: 'none',
					backgroundColor: `${isSelected ? colors.orange : colors.black}`,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
						justifyContent: 'center',

						paddingTop: '3px',
						paddingBottom: '3px',
						transition: '.3s',

					}}
					// onClick={handleClick}
				>
					<Checkbox
						sx={{
							color: colors.orange,
							'&.Mui-checked': {
								color: colors.white,
							},
						}}
						checked={isSelected}
						onChange={(event) => onSelectChange(id, event.target.checked)}
						onClick={(event) => event.stopPropagation()}
					/>
					<Typography
						variant='body1'
						color={colors.white}
						sx={{
							fontWeight: '600',
							fontSize: '1rem'
						}}
					>Select Person</Typography>
				</Box>
			</Box>
    </Box>
  );
};

export default PersonCard;
