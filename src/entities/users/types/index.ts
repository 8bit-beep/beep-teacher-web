import { AttendType } from "@/entities/attend-types/types";
import { StudentInfo } from "@/entities/students/types";

export interface User {
  id: number;
  email: string;
  username: string;
  role: "STUDENT";
  profileImage: string;
  studentInfo: StudentInfo;
  currentStatus: AttendType | null;
}
