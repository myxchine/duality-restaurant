"use client";

import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <div className="sidebar hidden md:block w-64  bg-white bg-opacity-50 text-black shadow-md  ">
      <div className="p-4">
        <ul className="mt-6">
          <li
            className="py-2 px-4  cursor-pointer font-bold"
            onClick={() => navigate("/admin")}
          >
            MAIN
          </li>
          <li
            className="py-2 px-4  cursor-pointer font-bold"
            onClick={() => navigate("/admin/manage")}
          >
            MANAGE
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
