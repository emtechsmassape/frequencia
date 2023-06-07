import { Card, CardContent, Typography } from "@mui/material";
import { BasePage } from "../../shared/components";
import { Link } from "react-router-dom";
import { People, GroupAdd, Person } from "@mui/icons-material";

export const DashboardSchool = () => {
  return (
    <BasePage isProfile>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/user">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <People />
            <Typography>Cadastrar Servidor</Typography>
          </CardContent>
        </Link>
      </Card>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/class">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <GroupAdd />
            <Typography>Cadastrar Turma</Typography>
          </CardContent>
        </Link>
      </Card>
      <Card
        sx={{
          width: "100%",
          height: 80,
          maxWidth: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/student">
          <CardContent sx={{ display: "flex", gap: 2 }}>
            <Person />
            <Typography>Cadastrar Aluno</Typography>
          </CardContent>
        </Link>
      </Card>
    </BasePage>
  );
};