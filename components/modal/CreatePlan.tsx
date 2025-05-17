"use client";
import React, {
  useActionState,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";
import UploadBox from "../ui/uploadBox";
import axios from "axios";
import { MapContext } from "../map/MapContext";

const CreatePlan = () => {
  const { feature, setFeature, setIsPlanCreated, setIsCancel } =
    useContext(MapContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCancelBotton = () => {
    setFeature(null);
    setIsPlanCreated(false);
    setIsCancel(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    formData.get("title") as string;
    formData.append("type", feature.type);
    formData.append("imageFile", fileInputRef.current.files[0]);
    formData.append("geom", feature.latLng);

    try {
      await axios.post(`/api/createplan`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsPlanCreated(true);
      setFeature(null);
    } catch (error) {
      setIsPlanCreated(false);
      throw new Error("Something went wrong with backend");
    }
  };

  return (
    <div className="absolute top-[50%] right-[50%] z-10 flex h-fit w-3/4 translate-x-[50%] translate-y-[-50%] flex-col justify-between rounded bg-white">
      <h4 className="bg-red-400 text-center text-5xl font-bold">Save Data</h4>
      <form className="flex h-full flex-col" onSubmit={handleSubmit}>
        <label className="text-3xl">Name</label>
        <input
          type="text"
          placeholder="required *"
          name="title"
          className="rounded-md border px-2.5 py-4 text-3xl"
        />
        <label className="text-3xl">Image</label>
        <UploadBox fileInputRef={fileInputRef} />
        {feature !== null && (
          <input type="hidden" value={JSON.stringify(feature)} name="plan" />
        )}
        <div className="flex h-16 justify-between">
          <button className="w-full" onClick={handleCancelBotton}>
            Cancel
          </button>
          <button className="w-full bg-amber-500" type="submit">
            {"Save"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePlan;
