import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { iChildren } from "../../../interfaces";
import { TableBase } from "../Base";

export const TableStudent = ({ children }: iChildren) => {
  return (
    <TableBase isPagination>
      <TableHead>
        <TableRow>
          <TableCell>Matrícula</TableCell>
          <TableCell>Aluno</TableCell>
          <TableCell>Infrequência</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableBase>
  );
};
