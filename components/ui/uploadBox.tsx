'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { CiCamera } from "react-icons/ci";



export default function UploadBox({ image }: { image?: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)


    useEffect(() => {
        setPreview(image || null)
    }, [image])


    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async () => {
        const file = fileInputRef.current?.files?.[0]
        if (!file) return console.log("not found image file")
        setPreview(URL.createObjectURL(file))
    }


    return (
        <>
            <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
            />
            <div className="w-52 h-52 bg-white mt-1  flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 transition border rounded-sm"
                onClick={handleClick}>
                {preview === null ? (<CiCamera size={48} />) : (<Image src={preview} alt='preview' width={400} height={400} className='w-full h-full' />)}
            </div>
        </>

    )
}
