import React, { useEffect, useRef, useState } from "react";
import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuHardDriveDownload } from "react-icons/lu";
import VolumeController from "./VolumeController";
import { useGlobalContext } from "../store/MusicContext";


const Player = () => {
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const { currentSong, playMusic, isPlaying, nextSong, previousSong } =
    useGlobalContext();

  const inputRef = useRef();

  const handleProgressChange = (e) => {
    const newPercentage = parseFloat(e.target.value);
    const newTime = (newPercentage / 100) * Number(currentSong.duration);
    if (newTime >= 0) {
      currentSong.audio.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (currentSong) {
      const audioElement = currentSong.audio;

      const handleTimeUpdate = () => {
        const duration = Number(currentSong.duration);
        const currentTime = audioElement.currentTime;
        const newTiming = (currentTime / duration) * 100;
        inputRef.current.value = newTiming;
      };

      const handleEndSong = () => {
        nextSong();
      };

      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleEndSong);

      return () => {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleEndSong);
      };
    }
  }, [currentSong]);

  const handleDownloadSong = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob()
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${currentSong.name}.mp3`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      alert("Error While Downloading The Song")
    }
  };

  return (
    <div className="px-2 flex flex-col fixed bottom-0 right-0 left-0">
      <input
        type="range"
        name="progress"
        id="progress"
        min={0}
        max={100}
        value={0}
        step="0.1"
        className="w-full h-[5px] text-green-500 range thumb"
        ref={inputRef}
        onChange={handleProgressChange}
      />

      <div className="flex justify-between items-center mb-3 px-2">
        <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
          <img
            src={currentSong?.image}
            alt=""
            className="rounded-lg"
            width={55}
          />
          <div className="hidden lg:block">
            <span className="text-sm text-gray-600">{currentSong?.name}</span>
            <p>{currentSong?.primaryArtists}</p>
          </div>
        </div>

        <div className="flex text-2xl lg:text-3xl  gap-4 lg:gap-6 lg:w:[40vw] justify-center">
          <BiRepeat className="text-gray-500 cursor-pointer" />
          <IoMdSkipBackward
            className="text-gray-700 hover:text-green-500 cursor-pointer"
            onClick={previousSong}
          />
          {isPlaying ? (
            <FaPause
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong?.audio,
                  currentSong?.name,
                  currentSong?.duration,
                  currentSong?.image,
                  currentSong?.id
                )
              }
            />
          ) : (
            <FaPlay
              className="text-gray-700 hover:text-red-500 cursor-pointer"
              onClick={() =>
                playMusic(
                  currentSong?.audio,
                  currentSong?.name,
                  currentSong?.duration,
                  currentSong?.image,
                  currentSong?.id
                )
              }
            />
          )}

          <IoMdSkipForward
            className="text-gray-700 hover:text-orange-500 cursor-pointer"
            onClick={nextSong}
          />
          <PiShuffleBold className="text-gray-700 hover:text-gray-500 cursor-pointer" />
        </div>

        <LuHardDriveDownload onClick={()=>handleDownloadSong(currentSong.audio.src)} className="text-gray-700 hover:text-gray-500 cursor-pointer text-2xl lg:text-3xl lg:mr-2" />

        <div
          className="flex lg:[30vw] justify-end items-center"
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
         
          <HiSpeakerWave className="text-gray-700 hover:text-gray-500 cursor-pointer text-2xl lg:text-3xl hidden lg:block" />
          <VolumeController isVolumeVisible={isVolumeVisible} />
        </div>
      </div>
    </div>
  );
};

export default Player;
