import React, { useLayoutEffect, useState } from "react";
import { useGlobalContext } from "../store/MusicContext";

const VolumeController = ({ isVolumeVisible }) => {
  const { currentSong } = useGlobalContext();
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (e) => {
    if (currentSong) {
      const newVolume = parseFloat(e.target.value) / 100;
      currentSong.audio.volume = newVolume;
      setVolume(newVolume);
    }
  };

  useLayoutEffect(() => {
    if (currentSong) {
      setVolume(currentSong.audio.volume * 100);
    }
  }, [currentSong, volume]);

  return (
    <div
      className={`w-[80px] absolute -rotate-90 bottom-20 -right-3 shadow-md px-2 rounded-lg bg-white ${
        isVolumeVisible ? "" : "hidden"
      }`}
    >
      <input
        type="range"
        min={0}
        value={volume}
        max={100}
        step="0.1"
        className="h-[5px] text-green-500 range"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeController;
