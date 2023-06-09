import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { iChildren } from "../../../interfaces";
import { TableBase } from "../Base";

interface iTableSchoolProps extends iChildren {
  is_active?: boolean;
}

export const TableSchool = ({ children, is_active }: iTableSchoolProps) => {
  return (
    <TableBase isPagination>
      <TableHead>
        <TableRow>
          {is_active && <TableCell></TableCell>}
          <TableCell>Escola</TableCell>
          <TableCell>Diretor</TableCell>
          <TableCell>Turmas</TableCell>
          <TableCell>Alunos</TableCell>
          <TableCell>Frequências</TableCell>
          <TableCell>Infrequência</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableBase>
  );
};
