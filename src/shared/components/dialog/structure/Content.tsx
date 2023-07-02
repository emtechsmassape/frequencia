import { Box } from "@mui/material";
import { iChildren } from "../../../interfaces";

export const BaseContentChildren = ({ children }: iChildren) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
      width="85vw"
      maxWidth={400}
      p={1}
    >
      {children}
    </Box>
  );
};
