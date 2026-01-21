import { useEffect, useState } from "react";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useRouter } from "@cher1shrxd/loading";

export const useFilterRoom = () => {
  const [floor, setFloor] = useState(FLOOR_OPTIONS[0]);
  const router = useRouter();

  useEffect(() => {
    router.push(`/?floor=${floor.value}`);
  }, [floor]);
    

  return {
    floor,
    setFloor,
  };
};
