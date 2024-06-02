"use client";

import { useRouter } from "next/navigation";
import { MdHomeFilled } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="sidebar hidden md:block w-80  bg-white bg-opacity-90 text-black  text-xs sticky  border-r border-gray-300  ">
      <div className="flex items-center justify-between border-b border-gray-200 p-4 h-[80px]">
        <h2 className="text-2xl font-bold ">DUALITY</h2>
      </div>
      <div className="p-4 space-y-8">
        <ul className="">
          <li
            className="py-2  cursor-pointer  flex items-center"
            onClick={() => navigate("/admin")}
          >
            <MdHomeFilled className="text-2xl mr-4" /> HOME
          </li>
          <li
            className="py-2  cursor-pointer flex items-center"
            onClick={() => navigate("/admin/manage")}
          >
            <TbLogs className="text-2xl mr-4" /> MANAGE
          </li>
          <li
            className="py-2  cursor-pointer flex items-center"
            onClick={() => navigate("/admin/account")}
          >
            <MdAccountCircle className="text-2xl mr-4" /> ACCOUNT
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
