import { iClassSchoolList, iheadCell } from "../../shared/interfaces";
import {
  useAppThemeContext,
  useAuthContext,
  useDrawerContext,
  useFrequencyContext,
  usePaginationContext,
} from "../../shared/contexts";
import { useEffect, useState } from "react";
import { apiClass } from "../../shared/services";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { TableBase, Tools } from "../../shared/components";
import { TableCell, TableRow } from "@mui/material";
import { defineBgColorInfrequency } from "../../shared/scripts";
import { LayoutSchoolPage } from "./Layout";
import { useDebounce } from "../../shared/hooks";

interface iCardClassProps {
  el: iClassSchoolList;
  school_id: string;
}
const CardClass = ({ el, school_id }: iCardClassProps) => {
  const { theme, mdDown } = useAppThemeContext();
  const navigate = useNavigate();
  return (
    <TableRow
      hover
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(
          `/school/student?id=${school_id}&class_id=${el.class.id}&back=/school/class`
        );
      }}
    >
      <TableCell>{el.class.name}</TableCell>
      {!mdDown && (
        <>
          <TableCell align="right">{el._count.students}</TableCell>
          <TableCell align="right">{el._count.frequencies}</TableCell>
        </>
      )}
      <TableCell
        align="right"
        sx={{
          color: "#fff",
          bgcolor: defineBgColorInfrequency(el.infreq, theme),
        }}
      >
        {String(el.infreq).replace(".", ",")}%
      </TableCell>
    </TableRow>
  );
};

export const ListClassSchoolPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { debounce } = useDebounce();
  const { mdDown } = useAppThemeContext();
  const { yearData, dashData, schoolData } = useAuthContext();
  const { isInfreq } = useFrequencyContext();
  const { handleClickClass } = useDrawerContext();
  const { setCount, setIsLoading, defineQuery } = usePaginationContext();
  const [data, setData] = useState<iClassSchoolList[]>();
  const [search, setSearch] = useState<string>();

  const headCells: iheadCell[] = mdDown
    ? [
        { order: "name", numeric: false, label: "Turma" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ]
    : [
        { order: "name", numeric: false, label: "Turma" },
        { numeric: true, label: "Alunos" },
        { numeric: true, label: "Frequências" },
        { order: "infreq", numeric: true, label: "Infrequência" },
      ];

  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolData) school_id = schoolData.id;

  useEffect(() => {
    let query = defineQuery(undefined, school_id);
    query += "&is_active=true";
    if (isInfreq) query += "&infreq=31";
    if (yearData) {
      if (search) {
        query += `&name=${search}`;
        setIsLoading(true);
        debounce(() => {
          apiClass
            .listSchool(yearData.id, query)
            .then((res) => {
              setData(res.result);
              setCount(res.total);
            })
            .finally(() => setIsLoading(false));
        });
      } else {
        setIsLoading(true);
        apiClass
          .listSchool(yearData.id, query)
          .then((res) => {
            setData(res.result);
            setCount(res.total);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [school_id, yearData, isInfreq, defineQuery, search]);

  if (dashData !== "ADMIN" && !school_id) {
    return <Navigate to="/" />;
  }

  return (
    <LayoutSchoolPage
      title="Listagem de Turmas"
      isSchool
      tools={
        <Tools
          isHome
          isBack={dashData === "ADMIN"}
          back={"/school?id=" + school_id}
          isNew={dashData === "ADMIN"}
          destNew={"/class/define/school?id=" + school_id}
          onClickNew={handleClickClass}
          isSearch
          search={search}
          setSearch={(text) => setSearch(text)}
          isFreq
        />
      }
    >
      <TableBase headCells={headCells}>
        {data?.map((el) => (
          <CardClass key={el.class.id} el={el} school_id={school_id} />
        ))}
      </TableBase>
    </LayoutSchoolPage>
  );
};
