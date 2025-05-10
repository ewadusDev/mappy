import LeftNavbar from "@/components/leftnav/LeftNavbar";
import BaseMapContainer from "@/components/map/BaseMapContainer";
import RightNavbar from "@/components/rightnav/RightNavbar";



export default async function Home() {

  return (
    <main className="flex">
      <LeftNavbar />
      <div className="w-screen h-screen">
        <BaseMapContainer />
      </div>
      <RightNavbar />
    </main>
  );
}
