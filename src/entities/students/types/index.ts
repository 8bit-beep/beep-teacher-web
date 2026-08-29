export interface Student {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  studentInfo: StudentInfo;
  typeId?: number | null;
}

export interface StudentInfo {
  id: number;
  grade: number;
  classNumber: number;
  num: number;
  cardId: string;
}
