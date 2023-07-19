import { Fragment, useMemo, useState } from "react";
import {
  DialogCreateServer,
  DialogRemoveUser,
  TableBase,
} from "../../../components";
import { useAppThemeContext, usePaginationContext } from "../../../contexts";
import { iUser, iHeadcell } from "../../../interfaces";
import { rolePtBr } from "../../../scripts";
import { Link, TableCell, TableRow, Typography } from "@mui/material";
import { ActionsUser } from "../actions";

interface iTableUserSchoolProps {
  data: iUser[];
  school_id: string;
}

export const TableUserSchool = ({ data, school_id }: iTableUserSchoolProps) => {
  const { mdDown } = useAppThemeContext();
  const { onClickReset } = usePaginationContext();
  const [userData, setUserData] = useState<iUser>();

  const handleUser = (newUser: iUser) => setUserData(newUser);

  const headCells: iHeadcell[] = useMemo(() => {
    if (mdDown)
      return [
        { order: "name", numeric: "left", label: "Nome Completo" },
        { numeric: "left", label: "CPF" },
        { numeric: "left", label: "Ações" },
      ];

    return [
      { order: "name", numeric: "left", label: "Nome Completo" },
      { numeric: "left", label: "CPF" },
      { numeric: "left", label: "Função" },
      { numeric: "left", label: "Tela" },
      { numeric: "left", label: "Ações" },
    ];
  }, [mdDown]);

  return (
    <>
      <TableBase headCells={headCells}>
        {data.map((user) => (
          <Fragment key={user.id}>
            {user.work_school && (
              <TableRow hover>
                <TableCell>
                  <Typography
                    underline="none"
                    variant="body2"
                    color="inherit"
                    component={Link}
                    href={`/user/${user.id}?school_id=${school_id}`}
                    onClick={onClickReset}
                  >
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell>{user.cpf}</TableCell>
                {!mdDown && (
                  <TableCell>{rolePtBr(user.work_school.role)}</TableCell>
                )}
                {!mdDown && (
                  <TableCell>
                    {user.work_school.dash === "SCHOOL"
                      ? "Escola"
                      : "Frequência"}
                  </TableCell>
                )}
                <ActionsUser
                  user={user}
                  handleUser={handleUser}
                  school_id={school_id}
                />
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBase>
      <DialogCreateServer school_id={school_id} />
      {userData && <DialogRemoveUser user={userData} locale="list" />}
    </>
  );
};
