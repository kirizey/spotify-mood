import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Fade from '../animations/Fade';
import httpClient from '../httpClient';
import qs from 'query-string'
import { Link } from 'react-router-dom';

export default function CategoryPage() {
  const { id } = useParams();
  const { search } = useLocation();

  //
  // State
  //

  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);

  //
  // Methods
  //

  async function loadCategoryPlaylists() {
    try {
      setIsLoading(true);
      const { data } = await httpClient.get(`/playlists/${id}`);
      setPlaylists(data);
    } finally {
      setIsLoading(false);
    }
  }

  //
  // Side effects
  //

  useEffect(() => {
    loadCategoryPlaylists()
  }, [])


  //
  // Render
  //

  function renderPlaylists() {
    return playlists.map(playlist => (
      <Link key={playlist.id} to={`/categories/${id}/${playlist.id}`}>
        <div className="Playlist">
          <img className="App__content-block" src={playlist.images[0]?.url} />
          <div className="Playlist__info">
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
          </div>
        </div>
      </Link>
    ))
  }

  return (
    <Fade>
      <h2>{qs.parse(search).name}</h2>
      {isLoading && 'Загрузка плейлистов...'}
      <div className="Playlists">{renderPlaylists()}</div>
    </Fade>
  );
}
