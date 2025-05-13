"use client"

import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import UploadBox from "../ui/uploadBox";
import { savePlan } from "@/lib/actions";
import { State } from "@/types/action"



const CreatePlan = () => {
    const [image, setImage] = useState(null)
    const initialState: State = { errors: {}, message: "" }
    const [state, fromAction, loading] = useActionState(savePlan, initialState)

    return (
        <div className="w-3/4 h-fit bg-white flex flex-col justify-between absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] rounded z-10">
            <h4 className="font-bold text-5xl text-center bg-red-400">Save Data</h4>
            <form className="flex flex-col h-full" action={fromAction}>
                <label className="text-3xl">Name</label>
                <input type="text" placeholder="required *" name="name" className="border rounded-md px-2.5 py-4 text-3xl" />
                <label className="text-3xl">Image</label>
                <UploadBox />
                <div className="flex justify-between h-16">
                    <button className="w-full">Cancel</button>
                    <button className="w-full bg-amber-500" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
};
export default CreatePlan;
