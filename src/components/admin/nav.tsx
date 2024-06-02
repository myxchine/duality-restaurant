"use client";

//import { FiHome, FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex justify-left items-top space-x-4 w-full mx-12 hidden md:block">
      <button
        className="text-black text-opacity-100 hover:text-red rounded p-4 rounded-xl"
        onClick={() => navigate("/admin")}
      >
        <div className="flex justify-center items-top space-x-2">
          <p className="text-sm font-bold uppercase">dashboard</p>
        </div>
      </button>
      <button
        className="text-black text-opacity-100  hover:text-red rounded p-4 rounded-xl"
        onClick={() => navigate("/admin/manage")}
      >
        <div className="flex justify-center items-center space-x-2">
          <p className="text-sm font-bold uppercase">MANAGE</p>
        </div>
      </button>
    </div>
  );
};

export default Nav;
