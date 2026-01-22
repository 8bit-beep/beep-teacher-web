import { AttendType } from "@/entities/attend-types/types";

export interface User {
  id: number;
  email: string;
  username: string;
  role: "STUDENT";
  profileImage: string;
  studentInfo: StudentInfo;
  currentStatus: AttendType | null;
}

export interface StudentInfo {
  id: number;
  grade: number;
  classNumber: number;
  num: number;
  cardId: string;
}
