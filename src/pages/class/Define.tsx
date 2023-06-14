import { FormContainer } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {
  CardSchoolId,
  SelectClass,
  SelectSchoolSelectData,
  Tools,
} from "../../shared/components";
import {
  useAuthContext,
  useClassContext,
  useDrawerContext,
  useSchoolContext,
} from "../../shared/contexts";
import { classSchoolCreateSchema } from "../../shared/schemas";
import { LayoutBasePage } from "../../shared/layouts";

export const DefineSchoolsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { yearData } = useAuthContext();
  const { createClassSchool } = useClassContext();
  const { schoolSelect } = useSchoolContext();
  const { handleClickSchool } = useDrawerContext();
  let school_id = "";
  if (id) {
    school_id = id;
  } else if (schoolSelect) school_id = schoolSelect.id;
  const back = id ? `/school/class?id=${id}&order=name` : undefined;

  return (
    <LayoutBasePage
      title="Definir Escola"
      school={id ? <CardSchoolId /> : <SelectSchoolSelectData />}
      tools={
        <Tools
          back={back}
          onClickBack={handleClickSchool}
          isHome
          isNew
          destNew="/class/create"
        />
      }
    >
      <FormContainer
        onSuccess={(data) => {
          if (yearData) createClassSchool(data, yearData.id, school_id, back);
        }}
        resolver={zodResolver(classSchoolCreateSchema)}
      >
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <SelectClass />
              </Grid>
            </Grid>
            <Grid container item direction="row" justifyContent="center">
              <Grid item xs={12} sm={9} md={6} lg={3}>
                <Button variant="contained" type="submit" fullWidth>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </FormContainer>
    </LayoutBasePage>
  );
};
