import React from "react";
import { useGlobalContext } from "../store/MusicContext";
import SongItem from "./SongItem";

const SearchSection = () => {
  const { searchedSong, searchSongLoading } = useGlobalContext();
  return searchSongLoading ? (
    <div className="w-full flex justify-center items-center"><h1 className="text-xl text-red-600">Loading</h1></div>
  ) : (
    <div
      className={`transition-all duration-500 ease-in-out flex justify-center items-center flex-wrap gap-4 bg-white bg-opacity-50 backdrop-blur-lg ${
        searchedSong.length == 0 ? "-translate-y-[1200px]" : "translate-y-0"
      }`}
    >
      {searchedSong?.map((ele) => {
        return <SongItem key={ele.id} {...ele} />;
      })}
    </div>
  );
};

export default SearchSection;
