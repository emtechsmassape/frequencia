import { z } from "zod";
import {
  schoolCreateSchema,
  schoolImportSchema,
  serverCreateSchema,
  studentCreateSchema,
  studentImportSchema,
} from "../schemas";
import { iClassWithSchoolDash } from "./class.interfaces";
import { iDash, iRole } from "./user.interfaces";
import { iStudentDash } from "./student.interface";

export interface iDirector {
  id: string;
  name: string;
  cpf: string;
}

export interface iDashSchool {
  frequencies: number;
  day_infreq?: number;
  school_infreq: number;
  frequencyOpen: number;
  classTotal: number;
  stundents: number;
}

export interface iSchool {
  id: string;
  name: string;
  is_active: boolean;
  created_at: Date;
  infreq: number;
  director?: iDirector;
}

interface iServer {
  id: string;
  name: string;
  cpf: string;
}

export interface iSchoolServer {
  role: iRole;
  dash: iDash;
  server: iServer;
}

export interface iSchoolList {
  id: string;
  name: string;
  director: string;
  classes: number;
  students: number;
  frequencies: number;
  infrequency: number;
}

export interface iSchoolDash extends iSchool {
  infrequency: number;
  total_students: number;
  classes: iClassWithSchoolDash[];
}

export interface iSchoolWithStudents extends iSchoolDash {
  students: iStudentDash[];
}

export interface iSchoolSelect extends iSchool {
  label: string;
}

export interface iWorkSchool {
  dash: iDash;
  role: iRole;
  school: iSchool;
}

export interface iWithSchool {
  id: string;
  name: string;
}

export type iServerRequest = z.infer<typeof serverCreateSchema>;

export type iSchoolRequest = z.infer<typeof schoolCreateSchema>;

export type iSchoolImportRequest = z.infer<typeof schoolImportSchema>;

export type iStudentRequest = z.infer<typeof studentCreateSchema>;

export type iStudentImportRequest = z.infer<typeof studentImportSchema>;
