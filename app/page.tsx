"use client";

import LeftNavbar from "@/components/leftnav/LeftNavbar";
import BaseMapContent from "@/components/map/BaseMapContainer";
import CreatePlan from "@/components/modal/CreatePlan";
import RightNavbar from "@/components/rightnav/RightNavbar";
import { useState, useEffect } from "react";
import { PlanForm } from "@/types/base";
import axios from "axios";
import { basemaps } from "@/data/basemaps";
import { MapContext } from "@/components/map/MapContext";

export default function Home() {
  const [feature, setFeature] = useState<PlanForm | null>(null);
  const [isPlanCreated, setIsPlanCreated] = useState(false);
  const [planList, setPlanList] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isCreateMapActive, setIsCreateMapActive] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [selectBaseMap, setSelectBaseMap] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`/api/getallplan`);
        const data = response.data.response;
        setPlanList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlans();

    setSelectBaseMap(basemaps[0].url);
  }, [feature, isDeleted]);

  return (
    <MapContext
      value={{
        feature,
        setFeature,
        isPlanCreated,
        setIsPlanCreated,
        selectedData,
        setSelectedData,
        isDeleted,
        setIsDeleted,
        isCreateMapActive,
        setIsCreateMapActive,
        isCancel,
        setIsCancel,
        selectBaseMap,
        setSelectBaseMap,
      }}
    >
      <main className="flex">
        <LeftNavbar data={planList} />
        <div className="relative h-screen w-screen">
          {feature !== null && !isPlanCreated && <CreatePlan />}
          <BaseMapContent />
        </div>
        <RightNavbar />
      </main>
    </MapContext>
  );
}
