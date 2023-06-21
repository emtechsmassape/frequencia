import { FieldValues } from "react-hook-form";
import {
  iFrequency,
  iFrequencyBase,
  iFrequencyStudentsBase,
  iFrequencyWithInfreq,
} from "../interfaces";
import { apiUsingNow } from "./api";

const create = async (data: FieldValues): Promise<iFrequency> => {
  const { data: response } = await apiUsingNow.post<iFrequency>(
    "frequencies",
    data
  );
  return response;
};

const update = async (
  data: FieldValues,
  id: string
): Promise<iFrequencyWithInfreq> => {
  const { data: response } = await apiUsingNow.patch<iFrequencyWithInfreq>(
    `frequencies/${id}`,
    data
  );
  return response;
};

const updateInfreq = async (data: FieldValues, id: string): Promise<void> => {
  await apiUsingNow.patch(`frequencies/infreq/${id}`, data);
};

const updateFreqStudent = async (
  data: FieldValues,
  id: string
): Promise<{frequency_id: string}> => {
  const { data: response } = await apiUsingNow.patch<{frequency_id: string}>(
    `frequencies/student/${id}`,
    data
  );
  return response;
};

const destroy = async (id: string) => {
  await apiUsingNow.delete(`frequencies/${id}`);
};

interface iStudentsReturn {
  total: number;
  frequency: iFrequencyBase;
  result: iFrequencyStudentsBase[];
}

const students = async (
  id: string,
  query: string
): Promise<iStudentsReturn> => {
  const { data: response } = await apiUsingNow.get<iStudentsReturn>(
    `frequencies/${id}/student${query}`
  );
  return response;
};

export const apiFrequency = {
  create,
  update,
  updateInfreq,
  updateFreqStudent,
  destroy,
  students,
};
