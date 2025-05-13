"use client"

import LeftNavbar from "@/components/leftnav/LeftNavbar";
import BaseMapContent from "@/components/map/BaseMapContainer";
import CreatePlan from "@/components/modal/CreatePlan";
import RightNavbar from "@/components/rightnav/RightNavbar";
import { useContext, useState } from "react";


export default function Home() {


  return (
    <main className="flex">
      <LeftNavbar />
      <div className="w-screen h-screen relative">
        <CreatePlan />
        <BaseMapContent />
      </div>
      <RightNavbar />
    </main>
  );
}
