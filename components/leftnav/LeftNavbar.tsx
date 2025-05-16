"use client"
import Image from "next/image";
import { CiMenuKebab, CiCirclePlus } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import { MapContext } from "@/app/page";


const LeftNavbar = ({ data }: { data: any }) => {
    const { selectedData, setSelectedData } = useContext(MapContext)


    const handleClick = (data: any) => {
        setSelectedData(data)
    }

    return <nav className="bg-white w-1/4 h-screen text-black shadow-xl rounded-br-xl rounded-tr-xl">
        <div className="p-2.5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
                <h1 className="text-6xl font-bold">Mappy</h1>
                <div className="w-20 h-20 object-cover">
                    <Image src={"/leftnav/mappy_logo.webp"} alt="logo" width={400} height={400} />
                </div>
            </div>

            <h6 className="text-3xl">Your map</h6>

            <ScrollArea className="h-2/4 ">
                {data && data.map((item: any, index: number) => {
                    return (
                        <div className={`flex gap-2 items-center my-2 p-2 ${item.plans.id === selectedData.plans.id && 'bg-gray-300'} hover:bg-gray-300   rounded-sm cursor-pointer`} key={item.plans.id} onClick={() => handleClick(item)}>
                            <p className="w-6">{index + 1}</p>
                            <Image src={item?.attachments?.file_url || "/leftnav/default-plan-image.webp"} width={400} height={400} alt="default_plan_image" className="w-16 h-16 object-cover rounded-[6px]" />
                            <p className="basis-2/3 pl-1">{item.plans.title}</p>
                            <Button variant={"ghost"} size={"icon"}>
                                <CiMenuKebab />
                            </Button>
                        </div>
                    )
                })}
            </ScrollArea>

            <div className="flex items-center justify-center">
                <CiCirclePlus size={65} className="cursor-pointer" />
            </div>

            {/* Profile */}
            <div className="flex items-center justify-between">
                <Avatar className="w-16 h-16 object-cover">
                    <AvatarImage src={'/leftnav/default-avatar.webp'} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="basis-2/3 pl-1 ">User Profile</p>
                <Button variant={"ghost"} size={"icon"}>
                    <CiMenuKebab />
                </Button>
            </div>
        </div>
    </nav >;
};
export default LeftNavbar;
