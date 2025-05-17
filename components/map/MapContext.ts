import { createContext } from "react";
import { TypeMapContext } from "@/types/context";

export const MapContext = createContext<TypeMapContext>({
  feature: null,
  setFeature: () => {},
  isPlanCreated: false,
  setIsPlanCreated: () => {},
  selectedData: null,
  setSelectedData: () => {},
  isDeleted: false,
  setIsDeleted: () => {},
  isCreateMapActive: false,
  setIsCreateMapActive: () => {},
  isCancel: false,
  setIsCancel: () => {},
  selectBaseMap: "",
  setSelectBaseMap: () => {},
});
