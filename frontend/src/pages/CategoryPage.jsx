import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Fade from '../animations/Fade';
import httpClient from '../httpClient';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MOODS } from '../App';

export default function CategoryPage() {
  const { id } = useParams();
  const { search } = useLocation();

  //
  // Store
  //

  const { maxMood } = useSelector((state) => state.client);

  //
  // State
  //

  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

  //
  // Methods
  //

  async function loadCategoryPlaylists() {
    setIsLoading(true);

    const { data } = await httpClient.get(`/playlists/${id}`);
    const requests = data.map((p) => httpClient.get(`/playlists/${id}/${p.id}`));
    const pls = [];

    Promise.all(requests).then((result) => {
      result.forEach((r) => {
        const rData = r.data;
        const moodTable = {
          [MOODS.calm]: 0,
          [MOODS.energetic]: 0,
          [MOODS.happy]: 0,
          [MOODS.sad]: 0,
        };
        rData.mood.forEach((md) => (moodTable[md.mood] += 1));
        const moodTableCounts = Object.values(moodTable);
        const maxMoodIndex = moodTableCounts.indexOf(Math.max(...moodTableCounts));
        const maxMoodName = Object.keys(moodTable)[maxMoodIndex];

        pls.push({ ...rData.playlist, mood: maxMoodName });
      });

      setPlaylists(pls);
      setIsLoading(false);
    });
  }

  //
  // Effects
  //

  useEffect(() => {
    loadCategoryPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  // Render
  //

  function renderPlaylists() {
    return playlists.map((playlist) => {
      const isPerfectBadge = playlist.mood === maxMood;
      const isImproveMoodBadge = maxMood === MOODS.sad && playlist.mood === MOODS.happy;
      const isTryToCalmBadge = maxMood === MOODS.energetic && playlist.mood === MOODS.calm;

      return (
        <Link key={playlist.id} to={`/categories/${id}/${playlist.id}`}>
          <div className="Playlist">
            {isPerfectBadge && <span class="material-icons md-48 isPerfectBadge">whatshot</span>}
            {isTryToCalmBadge && <span class="material-icons md-48 isTryToCalmBadge">invert_colors</span>}
            {isImproveMoodBadge && <span class="material-icons md-48 isImproveMoodBadge">rocket</span>}
            <img className="App__content-block" src={playlist.images[0]?.url} />
            <div className="Playlist__info">
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <Fade>
      <h2>{qs.parse(search).name}</h2>
      {isLoading && 'Загрузка плейлистов...'}
      <div className="Playlists">{renderPlaylists()}</div>
    </Fade>
  );
}
