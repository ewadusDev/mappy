"use client"
import React, { useActionState, useEffect, useContext, useRef, useState } from "react";
import UploadBox from "../ui/uploadBox";
import { MapContext } from "@/app/page";
import axios from "axios";



const CreatePlan = () => {
    const { feature, setFeature, setIsPlanCreated } = useContext(MapContext)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        formData.get("title") as string;
        formData.append('type', feature.type);
        formData.append('imageFile', fileInputRef.current.files[0]);
        formData.append('geom', feature.latLng)

        try {
            const resonse = await axios.post("http://localhost:3000/api/createplan", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsPlanCreated(true)
            setFeature(null)
        } catch (error) {
            setIsPlanCreated(false)
            throw new Error("Something went wrong with backend")
        }

    }

    return (
        <div className="w-3/4 h-fit bg-white flex flex-col justify-between absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] rounded z-10">
            <h4 className="font-bold text-5xl text-center bg-red-400">Save Data</h4>
            <form className="flex flex-col h-full" onSubmit={handleSubmit}>
                <label className="text-3xl">Name</label>
                <input type="text" placeholder="required *" name="title" className="border rounded-md px-2.5 py-4 text-3xl" />
                <label className="text-3xl">Image</label>
                <UploadBox fileInputRef={fileInputRef} />
                {feature !== null && (
                    <input type="hidden" value={JSON.stringify(feature)} name="plan" />
                )}
                <div className="flex justify-between h-16">
                    <button className="w-full">Cancel</button>
                    <button className="w-full bg-amber-500" type="submit">{"Save"} </button>
                </div>
            </form >
        </div >
    )
};
export default CreatePlan;
