import { useCallback, useEffect, useMemo } from "react";
import { usePaginationContext, useUserContext } from "../contexts";
import { useDebounce } from "../hooks";
import { iUser, iViewBaseProps } from "../interfaces";
import { TableUser, TableUserSchool } from "./tables";
import sortArray from "sort-array";
import { useSearchParams } from "react-router-dom";

export const ViewUser = ({ id }: iViewBaseProps) => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || undefined;
  const { debounce } = useDebounce();
  const { listData, getUsers } = useUserContext();
  const { query, order, by, search } = usePaginationContext();

  const define_query = useCallback(
    (comp: string) => {
      let query_data = query(undefined, id) + comp;
      if (role) query_data += `&role=${role}`;
      return query_data;
    },
    [id, query, role]
  );

  useEffect(() => {
    let query_data = "";
    if (search) {
      query_data += `&name=${search}`;
      debounce(() => {
        getUsers(define_query(query_data));
      });
    } else {
      getUsers(define_query(query_data));
    }
  }, [debounce, define_query, getUsers, search]);

  const table = useMemo(() => {
    const users = sortArray<iUser>(listData, { by: order, order: by });

    if (id) return <TableUserSchool data={users} school_id={id} />;

    return <TableUser data={users} />;
  }, [by, id, listData, order]);

  return table;
};
