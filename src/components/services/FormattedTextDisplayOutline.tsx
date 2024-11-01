import React from "react";
import ReactMarkdown from "react-markdown";

import { Box, Typography, TypographyProps } from "@mui/material";
import { getColor } from "@/utils/getColor";
import { FormattedTextDisplayOutlineProps } from "@/interfaces/components/services.interface";

// Create a forwardRef wrapper for Typography
const ForwardedTypography = React.forwardRef<HTMLSpanElement, TypographyProps>(
  (props, ref) => <Typography ref={ref} {...props} />
);

const FormattedTextDisplay = React.forwardRef<
  HTMLDivElement,
  FormattedTextDisplayOutlineProps
>(({ children, custom }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        "& p": { marginBottom: "8px" },
        "& h2": { marginTop: "12px", marginBottom: "8px" },
        "& h3": { marginTop: "12px", marginBottom: "8px" },
        "& hr": {
          margin: "12px 0",
          border: "none",
          borderTop: `1px solid ${getColor("silver")}`,
        },
        height: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      <ReactMarkdown
        components={{
          h1: (props) => (
            <ForwardedTypography
              component="h1"
              variant="h2"
              sx={{
                margin: 0,
                color: getColor("black"),
                fontSize: "1.7rem",
                fontFamily: "Rajdhani",
              }}
              {...props}
            />
          ),
          h2: (props) => (
            <ForwardedTypography
              component="h2"
              variant="h3"
              sx={{
                margin: 0,
                color: getColor("black"),
                fontSize: "1.5rem",
                fontFamily: "Rajdhani",
              }}
              {...props}
            />
          ),
          h3: (props) => (
            <ForwardedTypography
              component="h3"
              variant="h4"
              sx={{
                margin: 0,
                color: getColor("black"),
                fontSize: "1.4rem",
                fontFamily: "Rajdhani",
              }}
              {...props}
            />
          ),
          p: (props) => (
            <ForwardedTypography
              component="p"
              variant="body1"
              sx={{ color: custom ? custom : getColor("black"), margin: 0 }}
              {...props}
            />
          ),
          a: (props) => (
            <ForwardedTypography
              component="a"
              variant="body1"
              sx={{ color: custom ? custom : getColor("orange2"), margin: 0 }}
              target="_blank"
              {...props}
            />
          ),
          li: (props) => (
            <ForwardedTypography
              component="li"
              variant="body1"
              sx={{ color: custom ? custom : getColor("black"), margin: 0 }}
              {...props}
            />
          ),
          strong: (props) => (
            <strong
              style={{
                color: getColor("black"),
                padding: 0,
                margin: 0,
                fontWeight: "700",
              }}
              {...props}
            />
          ),
          em: (props) => (
            <em
              style={{ color: getColor("black"), fontWeight: "600" }}
              {...props}
            />
          ),
        }}
      >
        {String(children)}
      </ReactMarkdown>
    </Box>
  );
});

// Set the display name for the component
FormattedTextDisplay.displayName = "FormattedTextDisplay";
ForwardedTypography.displayName = "ForwardedTypography"; // Set display name for the Typography wrapper

export default FormattedTextDisplay;