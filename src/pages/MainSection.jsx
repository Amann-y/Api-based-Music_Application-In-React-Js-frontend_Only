import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AlbumItem from "../components/AlbumItem";
import Slider from "../components/Slider";
import { BallTriangle } from "react-loader-spinner";
import { useGlobalContext } from "../store/MusicContext";
import SearchSection from "../components/SearchSection";

const MainSection = () => {
  const [albums, setAlbums] = useState([]);
  const [trending, setTrending] = useState([]);
  const { searchedSong } = useGlobalContext();

  const getHomePageData = async () => {
    const res = await axios.get(
      "https://saavn.me/modules?language=hindi,english"
    );
    const data = res.data;
    setAlbums(data.data.albums);
    setTrending(data.data.trending);
  };

  useEffect(() => {
    getHomePageData();
  }, []);

  const trendingAlbums = useMemo(
    () => (Array.isArray(trending.albums) ? trending.albums : []),
    [trending.albums]
  );

  if (albums.length == 0 && searchedSong.length == 0) {
    return (
      <div className="flex justify-center items-center w-[80vw] mx-auto ">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (searchedSong.length > 0) {
    return <SearchSection />;
  } else {
    return (
      <section className=" px-2 py-5 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto py-1">
          Trending Now
        </h2>
        <Slider data={trendingAlbums} />
        <h2 className="text-xl font-semibold text-gray-700 w-full lg:w-[78vw] mx-auto py-1">
          Top Albums
        </h2>
        <Slider data={albums} />
      </section>
    );
  }
};

export default MainSection;
