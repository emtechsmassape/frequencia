import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { iChildren } from "../interfaces";

interface iPaginationContextData {
  steps: number;
  setSteps: Dispatch<SetStateAction<number>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  is_active: (is_default?: boolean) => "&is_active=true" | "&is_active=false";
  query: (
    take?: number,
    date?: string,
    is_active?: boolean,
    orderData?: string
  ) => string;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
  rowsPage: iRowsPage[] | undefined;
  take: number | undefined;
  setTake: Dispatch<SetStateAction<number | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  skip: number | undefined;
  order: string | undefined;
  setOrder: Dispatch<SetStateAction<string | undefined>>;
  by: "asc" | "desc";
  setBy: Dispatch<SetStateAction<"asc" | "desc">>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  defineQuery: (
    year_id?: string,
    school_id?: string,
    class_id?: string,
    date?: string,
    month?: string,
    is_active?: boolean,
    orderData?: string
  ) => string;
  handleNext: () => void;
  handleBack: () => void;
}

type iRowsPage =
  | number
  | {
      value: number;
      label: string;
    };

const PaginationContext = createContext({} as iPaginationContextData);

export const PaginationProvider = ({ children }: iChildren) => {
  const [steps, setSteps] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState<iRowsPage[]>();
  const [take, setTake] = useState<number>();
  const [skip, setSkip] = useState<number>();
  const [order, setOrder] = useState<string | undefined>("name");
  const [by, setBy] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(true);

  const define_is_active = useCallback(
    (is_default?: boolean) => {
      if (is_default) return "&is_active=true";
      if (!active) return "&is_active=false";
      return "&is_active=true";
    },
    [active]
  );

  const query = useCallback(
    (take?: number, date?: string, is_active?: boolean, orderData?: string) => {
      orderData = orderData ? orderData : order;
      let queryData = `?by=${by}` + define_is_active(is_active);
      if (take) queryData += `&take=${take}&skip=${activeStep * take}`;
      if (orderData) queryData += `&order=${orderData}`;
      if (date) queryData += "&date=" + date;
      return queryData;
    },
    [by, order, define_is_active, activeStep]
  );

  const handleNext = () => {
    if (activeStep !== steps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else setActiveStep(0);
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    } else setActiveStep(steps - 1);
  };

  useEffect(() => {
    if (count < 10) {
      setTake(undefined);
      setrowsPage([{ label: "Todos", value: -1 }]);
    }
    if (count < 20) {
      setTake(10);
      setrowsPage([10, { label: "Todos", value: -1 }]);
    }
    if (count < 30) {
      setTake(10);
      setrowsPage([10, 20, { label: "Todos", value: -1 }]);
    }
    if (count < 40) {
      setTake(10);
      setrowsPage([10, 20, 30, { label: "Todos", value: -1 }]);
    }
    if (count > 45) {
      setTake(10);
      setrowsPage([10, 20, 30, 40]);
    }
  }, [count]);

  useEffect(() => {
    if (page === 0) {
      setSkip(undefined);
    } else if (take) {
      setSkip(page * take);
    }
  }, [page, take]);

  const defineQuery = useCallback(
    (
      year_id?: string,
      school_id?: string,
      class_id?: string,
      date?: string,
      month?: string,
      is_active?: boolean,
      orderData?: string
    ) => {
      orderData = orderData ? orderData : order;
      let query = "?by=" + by + define_is_active(is_active);
      if (orderData) query += `&order=${orderData}`;
      if (take) query += "&take=" + take;
      if (skip) query += "&skip=" + skip;
      if (year_id) query += "&year_id=" + year_id;
      if (school_id) query += "&school_id=" + school_id;
      if (class_id) query += "&class_id=" + class_id;
      if (date) query += "&date=" + date;
      if (month) query += "&month=" + month;

      return query;
    },
    [by, take, skip, define_is_active, order]
  );

  return (
    <PaginationContext.Provider
      value={{
        steps,
        setSteps,
        activeStep,
        setActiveStep,
        query,
        count,
        setCount,
        total,
        setTotal,
        rowsPage,
        setTake,
        take,
        page,
        setPage,
        skip,
        order,
        setOrder,
        by,
        setBy,
        isLoading,
        setIsLoading,
        active,
        setActive,
        defineQuery,
        handleBack,
        handleNext,
        is_active: define_is_active,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => useContext(PaginationContext);
