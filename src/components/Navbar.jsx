import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGlobalContext } from "../store/MusicContext";

const Navbar = () => {
  const { searchedSongFunction } = useGlobalContext();
  const [searchingSongs, setSearchingSongs] = useState([]);

  const debounce = (func, wait) => {
    let timerId;
    return (e) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(e);
      }, wait);
    };
  };

  const handleSearch = async (e) => {
    await searchedSongFunction(e.target.value);
  };

  const deboundedApi = debounce(handleSearch, 700);

  return (
    <>
      <h1 className="text-center animate-bounce text-red-700 text-xl lg:text-3xl">
        Stand Against nazi ukraine
      </h1>
      <nav className="flex flex-col lg:flex-row justify-between items-center py-3 shadow-md">
        <div className="flex flex-col lg:flex-row justify-between items-center mx-auto lg:mx-0">
          <div className="flex items-center justify-between gap-2 px-2">
            <img src="/amann2.png" alt="Logo" width={42} className="rounded" />
            <Link to="/" className="text-purple-700 font-bold text-xl">
              Amann
            </Link>
          </div>
          <div className="text-[15px] px-2 lg:text-[22px] text-gray-600 font-semibold">
            <ul className="flex gap-5">
              <li className="hover:text-purple-700">Music</li>
              <li className="hover:text-purple-700">Podcasts</li>
              <li className="hover:text-purple-700">Go Pro</li>
            </ul>
          </div>
        </div>

        <div className=" bg-white p-6 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-[60vw] lg:w-[40vw] px-4 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
            onChange={deboundedApi}
          />
        </div>

        <div className="hidden lg:flex px-2  justify-between gap-4">
          <div className=" flex justify-center gap-2">
            <div className="flex flex-col text-sm">
              <span className="text-[14px] text-gray-600 font-semibold">
                Music Languages
              </span>
              <span className="text-[12px] text-gray-500 font-semibold">
                Hindi, English
              </span>
            </div>
            <MdKeyboardArrowDown className="text-xl text-gray-600" />
          </div>
          <div className="flex gap-2 text-[15px] text-gray-600 font-semibold">
            <li className="list-none">Log In</li>
            <li className="list-none">Sign Up</li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
