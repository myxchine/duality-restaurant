"use client";

import { useRouter } from "next/navigation";
import { MdHomeFilled } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
const Sidebar = () => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <div className="sidebar hidden md:block  bg-white bg-opacity-50 text-black shadow-md text-xs pr-4">
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold ">DUALITY</h2>
        </div>
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
