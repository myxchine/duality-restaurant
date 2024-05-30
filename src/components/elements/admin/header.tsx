import Link from "next/link";

const Header = () => {
  return (
    <header className="flex sticky top-0  items-center justify-center backdrop-blur  p-4 z-10000 ">
      <Link href="/">
        <h1 className="text-xl font-bold text-opacity-10">
          DUALITY RESTAURANT
        </h1>
      </Link>
    </header>
  );
};

export default Header;
