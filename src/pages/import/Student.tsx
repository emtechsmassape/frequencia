import { useState } from "react";
import { useAuthContext, useStudentContext } from "../../shared/contexts";
import { iPageProps } from "../../shared/interfaces";
import {
  BasePage,
  BoxResp,
  InputFile,
  SelectClass,
  SelectSchool,
} from "../../shared/components";
import { FormContainer } from "react-hook-form-mui";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentImportSchema } from "../../shared/schemas";
import { Button } from "@mui/material";

export const ImportStudentPage = ({ back }: iPageProps) => {
  const { schoolData } = useAuthContext();
  const { importStudent } = useStudentContext();
  const urlToDownload = "/students.csv";
  const [download, setDownload] = useState("");
  const [count, setCount] = useState(0);

  return (
    <BasePage isProfile back={back}>
      <FormContainer
        onSuccess={(data) => {
          if (schoolData) importStudent(data, schoolData.id, back);
        }}
        resolver={zodResolver(studentImportSchema)}
      >
        <BoxResp isProfile>
          <SelectSchool />
          <SelectClass />
          <Button
            onClick={() => {
              setDownload(urlToDownload);
              setCount((old) => old + 1);
            }}
          >
            Modelo do Arquivo .csv
          </Button>
          {download && (
            <iframe
              src={download + "?c=" + count}
              style={{ display: "none" }}
            ></iframe>
          )}
          <InputFile />
          <Button variant="contained" type="submit" fullWidth>
            Salvar
          </Button>
        </BoxResp>
      </FormContainer>
    </BasePage>
  );
};
