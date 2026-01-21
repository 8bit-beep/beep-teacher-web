import { Attendance } from "../types";

export const DUMMY_ATTENDANCE: Attendance = {
  userId: 1,
  studentId: "2315",
  username: "홍길동",
  statuses: [
    {
      checkpoint: { id: 1, name: "1차 자습" },
      status: { id: 1, name: "출석" },
    },
    {
      checkpoint: { id: 2, name: "2차 자습" },
      status: null,
    },
  ],
};
