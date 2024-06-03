import { MdAccountCircle } from "react-icons/md";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import("@/components/admin/clock"), {
  suspense: true,
});
import { Suspense } from "react";
const Header = () => {
  return (
    <header className="bg-white h-[80px] bg-opacity-90 text-black border-b  border-gray-300 p-4 md:px-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Restaurant by the Sea</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <Clock />
        </Suspense>
      </div>
      <div className=" md:hidden">
        <MdAccountCircle className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
