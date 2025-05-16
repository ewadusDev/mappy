import { PlanForm } from "./base"

export type TypeMapContext = {
    feature: PlanForm | null;
    setFeature: React.Dispatch<React.SetStateAction<PlanForm | null>>;
    isPlanCreated: boolean
    setIsPlanCreated: React.Dispatch<React.SetStateAction<boolean>>
    selectedData: any | null
    setSelectedData: React.Dispatch<React.SetStateAction<any>>
    isDeleted: boolean,
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>,
    isCreateMapActive: boolean,
    setIsCreateMapActive: React.Dispatch<React.SetStateAction<boolean>>,
    isCancel: boolean,
    setIsCancel: React.Dispatch<React.SetStateAction<boolean>>,
    selectBaseMap: any | null,
    setSelectBaseMap: React.Dispatch<React.SetStateAction<any>>
}
