"use client";
import Image from "next/image";
import { CiMenuKebab, CiCirclePlus, CiCircleRemove } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { MapContext } from "../map/MapContext";

const LeftNavbar = ({ data }: { data: any }) => {
  const {
    selectedData,
    setSelectedData,
    setIsDeleted,
    isCreateMapActive,
    setIsCreateMapActive,
  } = useContext(MapContext);
  const Icon = isCreateMapActive ? CiCircleRemove : CiCirclePlus;

  const handleSelectList = (data: any) => {
    if (selectedData?.plans.id === data.plans.id) {
      setSelectedData(null);
    } else {
      setSelectedData(data);
    }
  };

  const handdleDeleteList = useCallback((data: any) => {
    const deletePlan = async () => {
      try {
        const response = await axios.delete(`/api/deleteplan`, {
          data,
        });
        console.log(response);
        setIsDeleted(true);
      } catch (error) {
        console.log(error);
      }
    };
    deletePlan();
  }, []);

  return (
    <nav className="h-screen w-1/4 rounded-tr-xl rounded-br-xl bg-white text-black shadow-xl">
      <div className="flex h-full flex-col justify-between p-2.5">
        <div className="flex items-center justify-between">
          <h1 className="text-6xl font-bold">Mappy</h1>
          <div className="h-20 w-20 object-cover">
            <Image
              src={"/mappy-icon.png"}
              alt="logo"
              width={400}
              height={400}
            />
          </div>
        </div>

        <h6 className="text-3xl">Your map</h6>

        <ScrollArea className="h-2/4">
          {data &&
            data.map((item: any, index: number) => {
              return (
                <div
                  className={`my-2 flex items-center gap-2 p-2 hover:bg-gray-300 ${selectedData?.plans.id === item.plans.id && "bg-gray-300"} cursor-pointer rounded-sm`}
                  key={item.plans.id}
                  onClick={() => handleSelectList(item)}
                >
                  <p className="w-6">{index + 1}</p>
                  <Image
                    src={
                      item?.attachments?.file_url ||
                      "/leftnav/default-plan-image.webp"
                    }
                    width={400}
                    height={400}
                    alt="default_plan_image"
                    className="h-16 w-16 rounded-[6px] object-cover"
                  />
                  <p className="basis-2/3 pl-1">{item.plans.title}</p>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => handdleDeleteList(item)}
                  >
                    <CiMenuKebab />
                  </Button>
                </div>
              );
            })}
        </ScrollArea>

        <div className="flex items-center justify-center">
          <Icon
            size={65}
            className="cursor-pointer"
            onClick={() => setIsCreateMapActive(!isCreateMapActive)}
          />
        </div>

        {/* Profile */}
        <div className="flex items-center justify-between">
          <Avatar className="h-16 w-16 object-cover">
            <AvatarImage src={"/leftnav/default-avatar.webp"} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="basis-2/3 pl-1">User Profile</p>
          <Button variant={"ghost"} size={"icon"}>
            <CiMenuKebab />
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default LeftNavbar;
