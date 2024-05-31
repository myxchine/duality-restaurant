import { FiHome, FiUser } from "react-icons/fi";

const Nav = ({ setView }: { setView: (view: string) => void }) => {
  return (
    <div className="flex justify-left items-center space-x-4 w-full">
      <button
        className="text-black text-opacity-100 bg-white bg-opacity-30 hover:text-red rounded p-4 shadow-md rounded-xl"
        onClick={() => setView("main")}
      >
        <div className="flex justify-center items-center space-x-2">
          <FiHome />
          <p className="text-sm">MAIN VIEW</p>
        </div>
      </button>
      <button
        className="text-black text-opacity-100 bg-white bg-opacity-30 hover:text-red rounded p-4 shadow-md rounded-xl"
        onClick={() => setView("manage")}
      >
        <div className="flex justify-center items-center space-x-2">
          <FiUser />
          <p className="text-sm">MANAGE</p>
        </div>
      </button>
    </div>
  );
};

export default Nav;
