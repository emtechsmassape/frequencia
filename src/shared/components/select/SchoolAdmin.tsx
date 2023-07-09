import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext, usePaginationContext } from "../../contexts";
import { BaseSchoolAdmin, ListBase, Loading } from "./structure";
import { iSchool, iSchoolClass } from "../../interfaces";
import { apiSchool } from "../../services";

export const SelectSchoolAdmin = () => {
  const { yearData, schoolDataAdmin, setSchoolDataAdmin } = useAuthContext();
  const { query } = usePaginationContext();
  const [listSchoolSelect, setListSchoolSelect] = useState<iSchool[]>();
  const [listData, setListData] = useState<iSchoolClass[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (yearData) {
      const queryData = query(yearData.id);
      setLoading(true);
      apiSchool
        .listClass(queryData)
        .then((res) => {
          setListSchoolSelect(res.schools);
          setListData(res.result);
        })
        .finally(() => setLoading(false));
    }
  }, [yearData, query]);

  const openDialog = useMemo(() => {
    if (listSchoolSelect?.length === 0) {
      return false;
    }
    return schoolDataAdmin ? false : true;
  }, [listSchoolSelect, schoolDataAdmin]);

  const handleOpenDialog = useCallback(() => setSchoolDataAdmin(undefined), []);

  return (
    <BaseSchoolAdmin
      onClick={handleOpenDialog}
      open={openDialog}
      loading={!listSchoolSelect}
      options={listSchoolSelect}
    >
      {loading ? (
        <Loading />
      ) : (
        listData?.map((el) => (
          <ListBase
            key={el.id}
            name={el.name}
            onClick={() => {
              setSchoolDataAdmin(el);
            }}
          />
        ))
      )}
    </BaseSchoolAdmin>
  );
};
