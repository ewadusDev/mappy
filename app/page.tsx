import LeftNavbar from "@/components/leftnav/LeftNavbar";
import RightNavbar from "@/components/rightnav/RightNavbar";



export default async function Home() {

  return (
    <main className="flex">
      <LeftNavbar />
      <div className="w-full"></div>
      <RightNavbar />
    </main>
  );
}
