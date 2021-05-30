import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../httpClient'

export default function Categories() {
  //
  // State
  //

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  //
  // Methods
  //

  async function loadPlaylists() {
    try {
      setIsLoading(true);
      const { data } = await httpClient.get('/categories');
      setCategories(data);
    } finally {
      setIsLoading(false);
    }
  }

  //
  // Side effects
  //

  useEffect(() => {
    loadPlaylists();
  }, []);

  //
  // Render
  //

  function renderCategories() {
    return categories.map((genre) => (
      <Link key={genre.id} to={`/categories/${genre.id}?name=${genre.name}`}>
        <div className="Genre">
          <h2>{genre.name}</h2>
          <img className="App__content-block" src={genre.icons[0]?.url} />
        </div>
      </Link>
    ));
  }

  return (
    <section className="Categories">
      {isLoading && 'Загрузка жанров...'}
      {renderCategories()}
    </section>
  );
}
