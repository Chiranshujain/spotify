import React from "react";
import "./SongRow.css";

function SongRow({ track, playSong }) {
  console.log(track);
  return (
    <div className="songrow" onClick={() => playSong(track.id)}>
      <img className="songrow-album" src={track.album.images[0].url} alt="" />
      <div className="songrow-info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
