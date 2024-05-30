import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className=" bg-white bg-opacity-30 p-8 shadow-md w-full ">
        <Link href="/">
          <h1 className="text-2xl text-left font-bold text-opacity-10">
            DUALITY
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
