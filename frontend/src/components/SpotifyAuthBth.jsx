import React from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

export default function SpotifyAuthBth() {
  return (
    <div>
      <SpotifyAuth
        redirectUri="http://localhost:3000"
        clientID="b6cd81e8a5ff4daf82c105adf465fdf4"
        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.userReadRecentlyPlayed]}
      />
    </div>
  );
}
