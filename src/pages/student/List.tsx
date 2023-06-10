import { iStudentList } from "../../shared/interfaces";
import {
  useAppThemeContext,
  useAuthContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiUsingNow } from "../../shared/services";
import { LayoutBasePage } from "../../shared/layouts";
import { TableStudent, Tools } from "../../shared/components";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";

interface iCardStudentProps {
  student: iStudentList;
}
const CardStudent = ({ student }: iCardStudentProps) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>{student.registry}</TableCell>
      <TableCell>{student.name}</TableCell>
      {student.classes && student.classes.length > 0 && (
        <>
          <TableCell>{student.classes[0].class.class.name}</TableCell>
          <TableCell>{student.classes[0].class.school.name}</TableCell>
        </>
      )}
      <TableCell
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(student.infreq, theme),
        }}
      >
        {String(student.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListStudentPage = () => {
  const { setLoading } = useAppThemeContext();
  const { yearId } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { setCount, take, skip } = usePaginationContext();
  const [data, setData] = useState<iStudentList[]>();

  useEffect(() => {
    if (yearId) {
      let query = `?is_list=true&year_id=${yearId}`;
      if (isInfreq) query += "&infreq=31";
      if (take) query += `&take=${take}`;
      if (skip) query += `&skip=${skip}`;
      setLoading(true);
      apiUsingNow
        .get<{ total: number; result: iStudentList[] }>(`students${query}`)
        .then((res) => {
          setData(res.data.result);
          setCount(res.data.total);
        })
        .finally(() => setLoading(false));
    }
  }, [yearId, isInfreq, take, skip]);

  return (
    <LayoutBasePage
      title={"Listagem de Alunos"}
      tools={<Tools isHome isFreq />}
    >
      <TableStudent>
        <>
          {data?.map((student) => (
            <CardStudent key={student.id} student={student} />
          ))}
        </>
      </TableStudent>
    </LayoutBasePage>
  );
};
