import { FC } from "react";
import ReactMarkdown from "react-markdown";

import { Box, Typography } from "@mui/material";
import { FormattedTextDisplayProps } from "@/interfaces/components/services.interface";
import { getColor } from "@/utils/getColor";

const FormattedTextDisplay: FC<FormattedTextDisplayProps> = ({ children, custom }) => {
  return (
    <Box
      sx={{
        transition: ".3s",
        "& p": { marginBottom: "8px" },
        "& h2": {
          marginTop: "12px",
          marginBottom: "8px",
          color: getColor("silver"),
        },
        "& hr": {
          margin: "12px 0",
          border: "none",
          borderTop: `1px solid ${getColor("silver")}`,
        },
      }}
    >
      <ReactMarkdown
        components={{
          h1: (props) => (
            <Typography
              component="h1"
              variant="h2"
              {...props}
              sx={{
                margin: 0,
                color: `${getColor("orange")}!important`,
                fontSize: "2.2rem",
                fontWeight: "500",
              }}
            />
          ),
          h2: (props) => (
            <Typography
              component="h2"
              variant="h3"
              {...props}
              sx={{
                margin: 0,
                color: getColor("orange"),
                fontSize: "1.9rem",
                fontWeight: "400",
              }}
            />
          ),
          h3: (props) => (
            <Typography
              component="h3"
              variant="h4"
              {...props}
              sx={{
                margin: 0,
                color: getColor("orange"),
                fontSize: "1.7rem",
                fontWeight: "400",
              }}
            />
          ),
          h4: (props) => (
            <Typography
              component="h4"
              variant="h5"
              {...props}
              sx={{
                margin: 0,
                color: getColor("orange"),
                fontSize: "1.3rem",
                fontWeight: "400",
              }}
            />
          ),
          p: (props) => (
            <Typography
              component="p"
              variant="body1"
              {...props}
              sx={{ color: custom || getColor("blackPermanent"), margin: 0 }}
            />
          ),
          li: (props) => (
            <Typography
              component="li"
              variant="body1"
              {...props}
              sx={{ color: custom || getColor("blackPermanent"), margin: 0 }}
            />
          ),
          strong: (props) => (
            <strong
              style={{ color: getColor("orange"), padding: 0, margin: 0 }}
              {...props}
            />
          ),
          em: (props) => (
            <em style={{ color: getColor("orange") }} {...props} />
          ),
          pre: (props) => (
            <pre style={{ color: getColor("black") }} {...props} />
          ),
          code: (props) => (
            <code style={{ color: getColor("black") }} {...props} />
          ),
        }}
      >
        {children as string}
      </ReactMarkdown>
    </Box>
  );
};

export default FormattedTextDisplay;