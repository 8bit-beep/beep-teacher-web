import { useEffect, useState } from "react";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useRouter } from "@cher1shrxd/loading";

export const useFilterHistory = (param?: number) => {
  const [floor, setFloor] = useState(
    param ? { label: `${param}층`, value: `${param}` } : FLOOR_OPTIONS[0],
  );
  const router = useRouter();

  useEffect(() => {
    router.push(floor.value !== "1" ? `/histories?floor=${floor.value}` : "/histories");
  }, [floor]);

  return {
    floor,
    setFloor,
  };
};
