import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-center backdrop-blur bg-white bg-opacity-0 p-4 z-10000 max-w-screen-xl mx-auto">
      <Link href="/">
        <h1 className="text-xl font-bold text-opacity-10">DUALITY</h1>
      </Link>
    </header>
  );
};

export default Header;
