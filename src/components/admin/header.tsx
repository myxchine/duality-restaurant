import { MdAccountCircle } from "react-icons/md";
import Clock from "@/components/admin/clock";
const Header = () => {
  return (
    <header className="bg-white bg-opacity-50 text-black shadow-md p-4 md:px-8 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm">
      <div className="space-y-1">
        <h3 className="text-xl font-bold">Taberna by Lucia</h3>

        <Clock />
      </div>
      <div className=" md:hidden">
        <MdAccountCircle className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
