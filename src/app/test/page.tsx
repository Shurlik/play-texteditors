import React from 'react';
import {Box} from "@mui/material";
import Editor from "@/components/tests/TestEditor";

const Page = () => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <Editor/>
    </Box>
  );
};

export default Page;
