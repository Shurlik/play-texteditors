import React from "react";
import ReactMarkdown, { Components } from "react-markdown";

import { Typography } from "@mui/material";
import { getColor } from "@/utils/getColor";
import { FormattedTextDisplayPersDetailsProps } from "@/interfaces/components/services.interface";

const FormattedTextDisplay: React.FC<FormattedTextDisplayPersDetailsProps> = ({
  children,
  custom,
  small,
}) => {
  const components: Components = {
    h2: (props) => (
      <Typography
        variant="h3"
        {...props}
        sx={{ margin: 0, color: getColor("orange") }}
      />
    ),
    h3: (props) => (
      <Typography
        variant="h4"
        {...props}
        sx={{ margin: 0, color: getColor("orange") }}
      />
    ),
    p: (props) => (
      <Typography
        variant="body1"
        {...props}
        sx={{
          color: custom ? custom : getColor("black"),
          margin: 0,
          display: "inline",
        }}
      />
    ),
    li: (props) => (
      <Typography
        variant="body1"
        {...props}
        sx={{
          color: custom ? custom : getColor("black"),
          margin: 0,
          fontSize: small ? ".7rem" : "1rem",
        }}
      />
    ),
    strong: (props) => (
      <strong
        style={{ color: getColor("orange"), padding: 0, margin: 0 }}
        {...props}
      />
    ),
    em: (props) => <em style={{ color: getColor("orange") }} {...props} />,
  };

  return (
    <ReactMarkdown components={components}>{String(children)}</ReactMarkdown>
  );
};

export default FormattedTextDisplay;
