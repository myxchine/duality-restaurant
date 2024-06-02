"use client";

import Clock from "@/components/admin/clock";
import Nav from "@/components/admin/nav";

const Header = () => {
  return (
    <header className="h-[120px]">
      <div className=" p-8 w-full bg-white bg-opacity-50 sticky top-0 flex shadow">
        <div className="">
          <h1 className="text-2xl text-left font-bold text-opacity-10">
            DUALITY
          </h1>
          <Clock />
        </div>
      </div>
    </header>
  );
};

export default Header;
