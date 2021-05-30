import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Fade from './animations/Fade';
import Main from './pages/Main';
import CategoryPage from './pages/CategoryPage';
import PlaylistPage from './pages/PlaylistPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Fade>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path={`/categories/:id`} component={CategoryPage} />
          <Route exact path={`/categories/:id/:playlistId`} component={PlaylistPage} />
        </Switch>
      </Fade>
    </BrowserRouter>
  );
}
