import React from "react";
import { GoPlay } from "react-icons/go";
import { useGlobalContext } from "../store/MusicContext";

const SongsList = (props) => {
  const { isPlaying, currentSong, playMusic } = useGlobalContext();

  const { name, primaryArtists, duration, downloadUrl, image, id } = props;

  const convertTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex justify-between items-center w-[80wv] lg:[40vw] mb-2 lg:mb-1   p-1 px-3 hover:white  hover:shadow-md">
      <GoPlay
        className="text-3xl text-gray-600 hover:text-gray-800 transition-all ease-in-out"
        onClick={() =>
          playMusic(downloadUrl, name, duration, image, id, primaryArtists)
        }
      />
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-start w-[80%]">
        <span
          className={`font-bold text-xs ${
            id == currentSong?.id && "text-[#46c7b6ff]"
          }`}
        >
          {name}
        </span>
        <span className="font-thin text-xs text-gray-600">
          {primaryArtists}
        </span>
      </div>
      <div>
        <span className="font-thin text-xs text-gray-600 hidden lg:block">
          {convertTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default SongsList;
