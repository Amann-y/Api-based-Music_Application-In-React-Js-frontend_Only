import React from 'react'
import { useGlobalContext } from '../store/MusicContext'


const SongItem = ({name, image, duration, id, downloadUrl, primaryArtists}) => {
    const {playMusic} = useGlobalContext()
  return (
    <>
   
    <div className='w-[160px] max-h-[220px] overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg'>
        <img src={image && image[2].link} alt="" className='rounded-lg cursor-pointer' onClick={()=>playMusic(downloadUrl, name, duration, image, id, primaryArtists)}/>
        <div className='text-[13px] w-full flex flex-col justify-center items-center'>
            <span className='font-semibold overflow-x-clip'>{name}</span>
        </div>
    </div>
    </>
  )
}

export default SongItem