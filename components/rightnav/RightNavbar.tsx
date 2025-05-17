"use client";

import { basemaps } from "@/data/basemaps";
import Image from "next/image";
import { useContext, useState } from "react";
import { MapContext } from "../map/MapContext";

const RightNavbar = () => {
  const { setSelectBaseMap } = useContext(MapContext);
  const [isActivePanel, setIsActivePanel] = useState<boolean>(true);

  const handleClick = (url: string) => {
    setSelectBaseMap(url);
  };

  return (
    <nav
      className={`${isActivePanel ? "w-1/4 gap-2 overflow-auto" : "w-24"} flex items-end justify-center p-2.5 shadow-2xl`}
    >
      {basemaps.map((map, index) => {
        return (
          <div
            className={`${isActivePanel ? "block" : "hidden"}`}
            key={index}
            onClick={() => handleClick(map.url)}
          >
            <Image
              src={"/righnav/satellite_img.jpg"}
              alt="Satellite"
              width={400}
              height={400}
              className="h-16 w-16 rounded-[6px] object-cover"
            />
            <p className="text-center">{map.name}</p>
          </div>
        );
      })}
    </nav>
  );
};
export default RightNavbar;
