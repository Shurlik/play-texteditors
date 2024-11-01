import { ReactNode } from "react";

import { SelectChangeEvent } from "@mui/material";

export interface AssistantSelectorProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

export interface FormattedTextDisplayProps {
  children: ReactNode;
  custom?: string;
}

export interface FormattedTextDisplayProps {
  children: ReactNode;
  custom?: string;
  small?: boolean;
}

export interface FormattedTextDisplayOutlineProps {
  children: ReactNode; 
  custom?: string; 
  ref?: React.Ref<HTMLDivElement>; 
}

export interface FormattedTextDisplayPersDetailsProps { 
  children: React.ReactNode;
  custom?: string;
  small?: boolean;
}