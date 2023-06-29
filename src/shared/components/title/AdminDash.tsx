import { Breadcrumbs, Chip } from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { LinkRouter } from "../link";
import { Home } from "@mui/icons-material";

export const TitleAdminDash = () => {
  const { handleClickButtonTools } = useDrawerContext();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
    </Breadcrumbs>
  );
};

interface iTitleAdminDashPagesProps {
  breadcrumbs: JSX.Element[];
}

export const TitleAdminDashPages = ({
  breadcrumbs,
}: iTitleAdminDashPagesProps) => {
  const { mdDown } = useAppThemeContext();
  const { handleClickButtonTools } = useDrawerContext();

  return (
    <Breadcrumbs maxItems={mdDown ? 2 : undefined} aria-label="breadcrumb">
      <LinkRouter
        underline="none"
        color="inherit"
        to="/"
        onClick={handleClickButtonTools}
      >
        <Chip
          clickable
          color="primary"
          variant="outlined"
          label="Página Inicial"
          icon={<Home sx={{ mr: 0.5 }} fontSize="inherit" />}
        />
      </LinkRouter>
      {breadcrumbs}
    </Breadcrumbs>
  );
};