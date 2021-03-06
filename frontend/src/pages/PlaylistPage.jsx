import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Fade from '../animations/Fade';
import httpClient from '../httpClient';
import { Pie } from 'react-chartjs-2';

export default function PlaylistPage() {
  const { playlistId, id } = useParams();

  //
  // State
  //

  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [moodConfig, setMoodConfig] = useState([]);

  const chartData = {
    labels: ['Happy', 'Sad', 'Energetic', 'Calm'],
    datasets: [
      {
        label: '# of Votes',
        data: moodConfig.length > 0 && [
          moodConfig.filter((item) => item.mood === 'Happy').length,
          moodConfig.filter((item) => item.mood === 'Sad').length,
          moodConfig.filter((item) => item.mood === 'Energetic').length,
          moodConfig.filter((item) => item.mood === 'Calm').length,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 2,
        pointBackgroundColor: 'rgba(66,129,164,1)',
        pointBorderColor: '#fff',
      },
    ],
  };

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
        <div key={track.track.id} className="Track">
          <img src={track.track.album.images[0].url} />
          <div className="Track__info">
            <div className="Track__title">
              <a target="_blank" href={track.track.external_urls.spotify}>
                <h3>{track.track.name}</h3>
              </a>{' '}
              -<h3>({moodConfig.length > 0 && moodConfig.find((m) => m.id === track.track.id)?.mood})</h3>
            </div>
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
    <Fade style={{ display: 'flex' }}>
      <div className="PlaylistPage">
        {isLoading && '???????????????? ????????????...'}
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
      </div>
      {playlist && (
        <div style={{ width: 800 }}>
          <Pie data={chartData} className="PlaylistPage__Chart" />
        </div>
      )}
    </Fade>
  );
}
