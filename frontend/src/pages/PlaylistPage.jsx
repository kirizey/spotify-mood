import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Fade from '../animations/Fade';
import httpClient from '../httpClient';

export default function PlaylistPage() {
  const { playlistId, id } = useParams();

  //
  // State
  //

  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [moodConfig, setMoodConfig] = useState([]);

  //
  // Methods
  //

  async function loadCategoryPlaylists() {
    try {
      setIsLoading(true);
      const { data } = await httpClient.get(`/playlists/${id}/${playlistId}`);
      setPlaylist(data.playlist);
      setMoodConfig(data.mood);
    } finally {
      setIsLoading(false);
    }
  }

  //
  // Side effects
  //

  useEffect(() => {
    loadCategoryPlaylists();
  }, []);

  //
  // Render
  //

  function renderTracks() {
    return (
      playlist &&
      playlist.tracks.items.map((track) => (
        <div className="Track">
          <img src={track.track.album.images[0].url} />
          <div className="Track__info">
            <h3>{track.track.name}</h3>
            <div className="Track__subinfo">
              <h4 style={{ opacity: 0.6, fontWeight: 'normal' }}>{track.track.artists[0].name}</h4> -
              <h4 style={{ opacity: 0.6, fontWeight: 'normal' }}>{track.track.album.name}</h4>
            </div>
          </div>
        </div>
      ))
    );
  }

  return (
    <Fade>
      <div className="PlaylistPage">
        {isLoading && 'Загрузка треков...'}
        {playlist && (
          <div className="PlaylistPage__head">
            <img src={playlist.images[0].url} />
            <div className="PlaylistPage__info">
              <h2>{playlist.name}</h2>
              <p>{playlist.description}</p>
            </div>
          </div>
        )}

        <div className="PlaylistPage__Tracks">{renderTracks()}</div>

        {moodConfig}
      </div>
    </Fade>
  );
}
