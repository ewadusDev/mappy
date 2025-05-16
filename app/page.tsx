"use client"

import LeftNavbar from "@/components/leftnav/LeftNavbar";
import BaseMapContent from "@/components/map/BaseMapContainer";
import CreatePlan from "@/components/modal/CreatePlan";
import RightNavbar from "@/components/rightnav/RightNavbar";
import { useState, createContext, useEffect } from "react";
import { TypeMapContext } from "@/types/context"
import { PlanForm } from "@/types/base"
import axios from "axios";




export const MapContext = createContext<TypeMapContext>({
  feature: null,
  setFeature: () => { },
  isPlanCreated: false,
  setIsPlanCreated: () => { },
  selectedData: null,
  setSelectedData: () => { },
  isDeleted: false,
  setIsDeleted: () => { },
  isCreateMapActive: false,
  setIsCreateMapActive: () => { },
  isCancel: false,
  setIsCancel: () => { }
})

export default function Home() {
  const [feature, setFeature] = useState<PlanForm | null>(null)
  const [isPlanCreated, setIsPlanCreated] = useState(false)
  const [planList, setPlanList] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isCreateMapActive, setIsCreateMapActive] = useState(false)
  const [isCancel, setIsCancel] = useState(false)


  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getallplan")
        const data = response.data.response
        setPlanList(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPlans()
  }, [feature, isDeleted])


  return (
    <MapContext value={{ feature, setFeature, isPlanCreated, setIsPlanCreated, selectedData, setSelectedData, isDeleted, setIsDeleted, isCreateMapActive, setIsCreateMapActive, isCancel, setIsCancel }}>
      <main className="flex">
        <LeftNavbar data={planList} />
        <div className="w-screen h-screen relative">
          {feature !== null && !isPlanCreated && <CreatePlan />}
          <BaseMapContent />
        </div>
        <RightNavbar />
      </main>
    </MapContext>
  );
}
