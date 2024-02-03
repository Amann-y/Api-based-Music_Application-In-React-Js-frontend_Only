import { useContext, createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState([]);
  const [image, setImage] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchedSong, setSearchedSong] = useState([]);
  const [searchSongLoading, setSearchSongLoading] = useState(true)

  const playMusic = async (music, name, duration, pic, id, primaryArtists) => {
    if (currentSong && currentSong.id == id) {
      if (isPlaying) {
        setIsPlaying(false);
        currentSong.audio.pause();
      } else {
        setIsPlaying(true);
        await currentSong.audio.play();
      }
    } else {
      if (currentSong) {
        currentSong.audio.pause();
        setIsPlaying(false);
      }
      const newAudio = await new Audio(music[4].link);
      setCurrentSong({
        name,
        duration,
        image: pic[2].link,
        id,
        audio: newAudio,
        primaryArtists,
      });
      setIsPlaying(true);
      await newAudio.play();
    }
  };

  const nextSong = async () => {
    if (currentSong) {
      const index = await songs?.findIndex((song) => song.id == currentSong.id);
      if (songs.length!=0) {
        if (index == songs.length - 1) {
          const { downloadUrl="", name, duration, image, id, primaryArtists } =
            songs[0];
          playMusic(downloadUrl, name, duration, image, id, primaryArtists);
        } else {
          const { downloadUrl, name, duration, image, id, primaryArtists } =
            songs[index + 1];
          playMusic(downloadUrl, name, duration, image, id, primaryArtists);
        }
      }
     
    }
  };

  const previousSong = async () => {
    if (currentSong) {
      const index = await songs?.findIndex((song) => song.id == currentSong.id);
      if (index == 0) {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[songs.length - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      } else {
        const { downloadUrl, name, duration, image, id, primaryArtists } =
          songs[index - 1];
        playMusic(downloadUrl, name, duration, image, id, primaryArtists);
      }
    }
  };

  const searchedSongFunction = async (data) => {
    if (data && data != "") {
    setSearchSongLoading(true)
      const res = await axios.get(
        `https://saavn.me/search/songs?query=${data}&page=1&limit=2`
      );
      const output = await res.data;
      setSearchSongLoading(false)
      setSearchedSong(output.data.results);
    } else {
    setSearchSongLoading(false)
      setSearchedSong([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        songs,
        setSongs,
        image,
        setAlbum,
        album,
        setImage,
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        playMusic,
        nextSong,
        previousSong,
        searchedSongFunction,
        searchedSong,
        searchSongLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
