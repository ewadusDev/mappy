import { PlanForm } from "./base"

export type TypeMapContext = {
    feature: PlanForm | null;
    setFeature: React.Dispatch<React.SetStateAction<PlanForm | null>>;
    isPlanCreated: boolean,
    setIsPlanCreated: React.Dispatch<React.SetStateAction<boolean>>
}
