import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { SpotifyApiContext } from 'react-spotify-api';
import { Provider } from 'react-redux';

import 'react-spotify-auth/dist/index.css';

import AppRouter from './AppRouter';
import { store } from './store';
import AppDataLayer from './AppDataLayer';

export const MOODS = {
  energetic: 'Energetic',
  happy: 'Happy',
  sad: 'Sad',
  calm: 'Calm',
};

function App() {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState(Cookies.get('spotifyAuthToken'));

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')]);

  return (
    <Provider store={store}>
      <SpotifyApiContext.Provider value={spotifyAuthToken}>
        <AppDataLayer>
          <div className="App">
            <AppRouter />
          </div>
        </AppDataLayer>
      </SpotifyApiContext.Provider>
    </Provider>
  );
}

export default App;
