import React from "react";
import { Link } from "react-router-dom";

const AlbumItem = ({ name, artists, id, image, year }) => {
  return (
    <Link
      to={`/album/${id}`}
      className="w-[200px] h-[280px] overflow-y-clip hover:scale-105 hover:bg-yellow-100 mx-auto bg-white rounded overflow-hidden shadow-lg flex flex-col"
    >
      <img
        className=" h-48 object-cover"
        src={image[2].link}
        alt={name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-[12px] mb-2">{name}</div>
        <p className="text-gray-700 text-base"> {year}</p>
      </div>
    </Link>
  );
};

export default AlbumItem;
