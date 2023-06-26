import { Box, IconButton } from "@mui/material";
import { iChildren } from "../interfaces";
import { Menu } from "@mui/icons-material";
import { useAppThemeContext, useDrawerContext } from "../contexts";
import { ReactNode } from "react";

interface iLayoutBasePageProps extends iChildren {
  title: ReactNode;
  tools?: ReactNode;
  isSchool?: boolean;
}

export const LayoutBasePage = ({
  children,
  title,
  tools,
}: iLayoutBasePageProps) => {
  const { theme, smDown, mdDown } = useAppThemeContext();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      height="100%"
      display="flex"
      flexDirection="column"
      gap={1}
      paddingLeft={smDown ? 0 : 2}
    >
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 10)}
        gap={1}
      >
        {smDown && (
          <IconButton color="primary" onClick={toggleDrawerOpen}>
            <Menu />
          </IconButton>
        )}
        {title}
      </Box>
      {tools && <Box>{tools}</Box>}
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
