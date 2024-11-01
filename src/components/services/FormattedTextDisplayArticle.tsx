import React from "react";
import ReactMarkdown from "react-markdown";

import { Typography } from "@mui/material";
import { FormattedTextDisplayProps } from "@/interfaces/components/services.interface";
import { getColor } from "@/utils/getColor";

const FormattedTextDisplay: React.FC<FormattedTextDisplayProps> = ({
  children,
  custom,
  small,
}) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <Typography
            component="h1" // Specify the component type
            variant="h3"
            sx={{
              marginTop: "10px",
              color: getColor("orange"),
              fontSize: "2rem",
            }}
            {...props} // Spread the rest of the props
          >
            {props.children} {/* Ensure children are rendered */}
          </Typography>
        ),
        h2: ({ node, ...props }) => (
          <Typography
            component="h2"
            variant="h3"
            sx={{
              marginTop: "10px",
              color: getColor("orange"),
              fontSize: "1.6rem",
            }}
            {...props}
          >
            {props.children}
          </Typography>
        ),
        h3: ({ node, ...props }) => (
          <Typography
            component="h3"
            variant="h4"
            sx={{ margin: 0, color: getColor("orange") }}
            {...props}
          >
            {props.children}
          </Typography>
        ),
        p: ({ node, ...props }) => (
          <Typography
            component="p"
            variant="body1"
            sx={{
              color: custom ? custom : getColor("white"),
              margin: 0,
              display: "inline",
            }}
            {...props}
          >
            {props.children}
          </Typography>
        ),
        li: ({ node, ...props }) => (
          <Typography
            component="li"
            variant="body1"
            sx={{
              color: custom ? custom : getColor("white"),
              margin: 0,
              fontSize: small ? ".7rem" : "1rem",
            }}
            {...props}
          >
            {props.children}
          </Typography>
        ),
        strong: ({ node, ...props }) => (
          <strong
            style={{ color: getColor("orange"), padding: 0, margin: 0 }}
            {...props}
          >
            {props.children}
          </strong>
        ),
        em: ({ node, ...props }) => (
          <em style={{ color: getColor("orange") }} {...props}>
            {props.children}
          </em>
        ),
      }}
    >
      {String(children)}
    </ReactMarkdown>
  );
};

export default FormattedTextDisplay;