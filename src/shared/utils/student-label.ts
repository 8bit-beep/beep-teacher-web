import { AbsenceTargetStudent } from "@/entities/absences/types"
import { studentCode } from "./student-code"

export const studentLabel = (isGrouped: boolean, studentinfo: AbsenceTargetStudent[]) => {
    const firststudent = studentinfo[0]
    return isGrouped ? 
    `${studentCode(firststudent.info.grade, firststudent.info.classNumber, firststudent.info.num)} ${firststudent.name}외 ${studentinfo.length - 1}명` : 
    `${studentCode(firststudent.info.grade, firststudent.info.classNumber, firststudent.info.num)} ${firststudent.name}`
  }