import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

import bg from './assets/img/bg.jpg';

import Fade from './animations/Fade';
import Main from './pages/Main';
import CategoryPage from './pages/CategoryPage';
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import SpotifyAuthBth from './components/SpotifyAuthBth';
import { SpotifyApiContext } from 'react-spotify-api';

export default function AppRouter() {
  const spotifyAuthToken = useContext(SpotifyApiContext);

  return (
    <BrowserRouter>
      <img className="App__bg" src={bg} />
      <header>
        <a href="/">
          <h1 className="App__title">Moodify</h1>
        </a>
        {!spotifyAuthToken ? <SpotifyAuthBth /> : <Link to={'/profile'}>Profile</Link>}
      </header>

      <Fade>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path={`/categories/:id`} component={CategoryPage} />
          <Route exact path={`/categories/:id/:playlistId`} component={PlaylistPage} />
          <Route exact path={`/profile`} component={ProfilePage} />
        </Switch>
      </Fade>
    </BrowserRouter>
  );
}
