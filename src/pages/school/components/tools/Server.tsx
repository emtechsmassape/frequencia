import { PersonAdd } from "@mui/icons-material";
import { Tools } from "../../../../shared/components";
import { useSchoolContext } from "../../../../shared/contexts";

export const ToolsSchoolServer = () => {
  const { handleOpenCreate, search, setSearch } = useSchoolContext();
  return (
    <Tools
      back="/school"
      isSchool
      iconNew={<PersonAdd />}
      onClickNew={handleOpenCreate}
      titleNew="Servidor"
      isSearch
      search={search}
      setSearch={setSearch}
    />
  );
};
