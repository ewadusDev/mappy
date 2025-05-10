import Image from "next/image";


const RightNavbar = () => {
    return <nav className="w-24 p-2.5 shadow-2xl flex items-end justify-center">
        <div className="border-2 rounded-md border-orange-500 p-0.5 bg-amber-300 shadow-md">
            <Image src={"/righnav/satellite_img.jpg"} alt="Satellite" width={400} height={400} className="w-16 h-16 object-cover rounded-[6px]" />
            <p>Satellite</p>
        </div>

    </nav>;
};
export default RightNavbar;
