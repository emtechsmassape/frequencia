import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Checklist, EventBusy, Groups, School } from "@mui/icons-material";
import {
  useAppThemeContext,
  useAuthContext,
  useCalendarContext,
  useDrawerContext,
  usePaginationContext,
} from "../../contexts";
import { iDashSchool } from "../../interfaces";
import { apiUsingNow } from "../../services";
import { SelectSchool } from "../select";
import { GridDashContent } from "./GridDashContent";
import { GridDashOrgan } from "./Organ";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pt-br";
dayjs.extend(localizedFormat);

export const GridDashSchool = () => {
  const { setLoading } = useAppThemeContext();
  const { yearData, schoolData } = useAuthContext();
  const { handleClickFrequency, handleClickSchool } = useDrawerContext();
  const { setDateData } = useCalendarContext();
  const { defineQuery } = usePaginationContext();
  const [infoSchool, setInfoSchool] = useState<iDashSchool>();

  useEffect(() => {
    if (schoolData && yearData) {
      const date = dayjs().format("DD/MM/YYYY");
      const query = defineQuery(undefined, undefined, undefined, date);
      setLoading(true);
      apiUsingNow
        .get<iDashSchool>(
          `schools/${schoolData.id}/dash/${yearData.id}${query}`
        )
        .then((res) => setInfoSchool(res.data))
        .finally(() => setLoading(false));
    }
  }, [schoolData, yearData, defineQuery]);

  return (
    <Grid container item direction="row" xs={12} md={5} spacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Typography variant="h6" textAlign="center">
            {dayjs().format("dddd, LL")}
          </Typography>
          <SelectSchool />
        </Box>
      </Grid>
      {infoSchool && (
        <>
          <GridDashContent
            icon={<Checklist fontSize="large" />}
            quant={`${infoSchool.frequencies}/${infoSchool.classTotal}`}
            info="Frequências no dia"
            dest={
              infoSchool.frequencies === infoSchool.classTotal
                ? "/frequency/list?date=" + dayjs().format("DD/MM/YYYY")
                : "/frequency"
            }
            onClick={() => {
              setDateData(dayjs());
              handleClickFrequency();
            }}
          />
          {infoSchool.frequencyOpen !== 0 ? (
            <GridDashContent
              icon={<EventBusy fontSize="large" />}
              quant={infoSchool.frequencyOpen}
              info={
                infoSchool.frequencyOpen === 1
                  ? "Frequência em aberto"
                  : "Frequências em aberto"
              }
              dest="/frequency/open"
              onClick={handleClickFrequency}
            />
          ) : (
            <GridDashContent
              icon={<Groups fontSize="large" />}
              quant={infoSchool.stundents}
              info={infoSchool.stundents === 1 ? "Aluno" : "Alunos"}
              dest="/school/student"
              onClick={handleClickSchool}
            />
          )}
          <GridDashContent
            icon={<School fontSize="large" />}
            quant={
              infoSchool?.school_infreq
                ? infoSchool.school_infreq.toFixed(0) + "%"
                : "0%"
            }
            info="Infrequência"
            dest="/school/class"
            onClick={handleClickSchool}
          />
        </>
      )}
      <GridDashOrgan />
    </Grid>
  );
};