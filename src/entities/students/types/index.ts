export interface Student {
  id: number;
  username: string;
  name: string;
  email: string;
  profileImage: string;
  studentInfo: StudentInfo;
}

export interface StudentInfo {
  id: number;
  grade: number;
  classNumber: number;
  num: number;
  cardId: string;
}