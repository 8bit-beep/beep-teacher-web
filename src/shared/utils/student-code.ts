import { pad } from "./pad"

export const studentCode = (grade: number, classNumber: number, studentId: number) => {
    const studentCode =  `${grade.toString()}${classNumber.toString()}${pad(studentId, 2)}`;
    return studentCode
}