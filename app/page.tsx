"use client"

import LeftNavbar from "@/components/leftnav/LeftNavbar";
import BaseMapContent from "@/components/map/BaseMapContainer";
import CreatePlan from "@/components/modal/CreatePlan";
import RightNavbar from "@/components/rightnav/RightNavbar";
import { useState, createContext } from "react";
import { TypeMapContext } from "@/types/context"
import { PlanForm } from "@/types/base"


export const MapContext = createContext<TypeMapContext>({
  feature: null,
  setFeature: () => { },
  isPlanCreated: false,
  setIsPlanCreated: () => { }
})

export default function Home() {
  const [feature, setFeature] = useState<PlanForm | null>(null)
  const [isPlanCreated, setIsPlanCreated] = useState(false)


  return (
    <MapContext value={{ feature, setFeature, isPlanCreated, setIsPlanCreated }}>
      <main className="flex">
        <LeftNavbar />
        <div className="w-screen h-screen relative">
          {feature !== null && !isPlanCreated && <CreatePlan />}
          <BaseMapContent />
        </div>
        <RightNavbar />
      </main>
    </MapContext>

  );
}
