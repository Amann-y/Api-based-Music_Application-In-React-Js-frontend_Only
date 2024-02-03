import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Player from "../components/Player";
import axios from "axios";
import { useGlobalContext } from "../store/MusicContext";
import SongsList from "../components/SongsList";
import { BallTriangle } from "react-loader-spinner";

const Album = () => {
  const { id } = useParams();
  const [albumDetails, setAlbumDetails] = useState([]);
  const { setSongs, setAlbum, setImage, image, album, songs } =
    useGlobalContext();

  const getAlbumDetail = async () => {
    const response = await axios.get(`https://saavn.me/albums?id=${id}`);
    const data = response.data;
    setAlbumDetails(data.data);
    setSongs(data.data.songs);
    setAlbum(data.data);
    setImage(data.data.image[2].link);
  };

  useEffect(() => {
    getAlbumDetail();
  }, [id]);

  if (album.length==0) {
    return (
      <div className="flex justify-center items-center w-[80vw] mx-auto ">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#6C22A6"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row  justify-center  items-center gap-8 lg:gap-28  mt-5 lg:mt-10 mb-24  lg:my-0 mx-2 lg:mx-auto lg:px-5">
        <div>
          <img
            src={image}
            alt={album.name}
            width={250}
            className="mx-auto mb-4 rounded-lg"
          />
          <div className="w-[250px] text-gray-700">
            <h1>{album.name}</h1>
            <p>
              By {(album?.primaryArtists?.length>0 ? album?.primaryArtists?.split(",")[0]:"")}, {album.songCount} Songs
            </p>
          </div>
        </div>
        <div className="  lg:h-[50vh] overflow-auto">
          {songs?.map((ele) => {
            return <SongsList key={ele.id}  {...ele}/>;
          })}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Album;
