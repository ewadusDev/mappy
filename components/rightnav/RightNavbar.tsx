"use client"
import { MapContext } from "@/app/page";
import { basemaps } from "@/data/basemaps";
import Image from "next/image";
import { useContext, useState } from "react";



const RightNavbar = () => {
    const { setSelectBaseMap } = useContext(MapContext)
    const [isActivePanel, setIsActivePanel] = useState<boolean>(true)

    const handleClick = (url: string) => {
        setSelectBaseMap(url)

    }


    return <nav className={`${isActivePanel ? 'w-1/4  gap-2 overflow-auto' : 'w-24'} flex p-2.5 shadow-2xl  items-end justify-center`}>
        {basemaps.map((map, index) => {
            return (
                <div className={`${isActivePanel ? 'block' : 'hidden'}`} key={index} onClick={() => handleClick(map.url)}>
                    <Image src={"/righnav/satellite_img.jpg"} alt="Satellite" width={400} height={400} className="w-16 h-16 object-cover rounded-[6px]" />
                    <p className="text-center">{map.name}</p>
                </div>
            )
        })}

    </nav>;
};
export default RightNavbar;
