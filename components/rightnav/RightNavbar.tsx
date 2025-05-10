"use client"
import Image from "next/image";
import { useContext, useState } from "react";


const RightNavbar = () => {
    const [isActivePanel, setIsActivePanel] = useState<boolean>(true)


    return <nav className={`${isActivePanel ? 'w-1/4  gap-2 overflow-auto' : 'w-24'} flex p-2.5 shadow-2xl  items-end justify-center`}>
        <div className="border-2 rounded-md border-orange-500 p-0.5 bg-amber-300 shadow-md">
            <Image src={"/righnav/road_img.jpg"} alt="Satellite" width={400} height={400} className="w-16 h-16 object-cover rounded-[6px]" />
            <p className="text-center">Road</p>
        </div>
        <div className={`${isActivePanel ? 'block' : 'hidden'}`} >
            <Image src={"/righnav/satellite_img.jpg"} alt="Satellite" width={400} height={400} className="w-16 h-16 object-cover rounded-[6px]" />
            <p className="text-center">Satellite</p>
        </div>
        <div className={`${isActivePanel ? 'block' : 'hidden'}`} >
            <Image src={"/righnav/satellite_img.jpg"} alt="Satellite" width={400} height={400} className="w-16 h-16 object-cover rounded-[6px]" />
            <p className="text-center">Terrain</p>
        </div>
        {/* <div className={`${isActivePanel ? 'block' : 'hidden'}`} >
            <Image src={"/righnav/satellite_img.jpg"} alt="Satellite" width={400} height={400} className="w-16 h-16 object-cover rounded-[6px]" />
            <p className="text-center">Hybrid</p>
        </div> */}

    </nav>;
};
export default RightNavbar;
