import { useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { TableBase } from "../../../components";
import { iSchool, iheadCell } from "../../../interfaces";
import { useBgColorInfrequency } from "../../../hooks";

interface iTableSchoolProps {
  data: iSchool[];
}

export const TableSchoolClass = ({ data }: iTableSchoolProps) => {
  const { defineBgColorInfrequency } = useBgColorInfrequency();

  const headCells: iheadCell[] = useMemo(() => {
    return [
      { order: "name", numeric: false, label: "Escola" },
      { order: "students", numeric: true, label: "Alunos" },
      { order: "frequencies", numeric: true, label: "Frequências" },
      { order: "infrequency", numeric: true, label: "Infrequência" },
    ];
  }, []);

  return (
    <TableBase headCells={headCells} message="Nenhuma escola encotrada">
      {data.map((school) => (
        <TableRow key={school.id}>
          <TableCell>{school.name}</TableCell>
          <TableCell align="right">{school.students}</TableCell>
          <TableCell align="right">{school.frequencies}</TableCell>
          <TableCell
            align="right"
            sx={{
              color: "#fff",
              bgcolor: defineBgColorInfrequency(school.infrequency),
            }}
          >
            {school.infrequency.toFixed(0)}%
          </TableCell>
        </TableRow>
      ))}
    </TableBase>
  );
};
