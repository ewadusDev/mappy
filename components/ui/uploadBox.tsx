"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { CiCamera } from "react-icons/ci";

export default function UploadBox({
  image,
  fileInputRef,
}: {
  image?: string;
  fileInputRef: React.RefObject<HTMLInputElement> | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setPreview(image || null);
  }, [image]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) throw Error("not found image file");
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <input
        type="file"
        name="image"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className="mt-1 flex h-52 w-52 items-center justify-center rounded-sm border bg-white transition hover:cursor-pointer hover:bg-gray-100"
        onClick={handleClick}
      >
        {preview === null ? (
          <CiCamera size={48} />
        ) : (
          <Image
            src={preview}
            alt="preview"
            width={400}
            height={400}
            className="h-full w-full"
          />
        )}
      </div>
    </>
  );
}
