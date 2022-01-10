import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useUser, BrowseRecommendations, SpotifyApiContext } from 'react-spotify-api';
import qs from 'query-string';

export default function ProfilePage() {
  const spotifyAuthToken = useContext(SpotifyApiContext);
  const { data: user } = useUser();
  const [playlists, setPlaylists] = useState([]);

  const getPlaylists = async () => {
    const query = qs.stringify({
      timestamp: new Date().toISOString(),
      platform: 'web',
      content_limit: 10,
      limit: 20,
      types: 'album,playlist,artist,show,station,episode',
      image_style: 'gradient_overlay',
      include_external: 'audio',
      country: 'RU',
      locale: 'en',
      // market: 'from_token',
    });
    // const asd = await axios.get(`https://api.spotify.com/v1/views/personalized-recommendations?${query}`, {
    //   headers: {
    //     authorization: `Bearer ${spotifyAuthToken}`,
    //   },
    // });

    // console.log(asd);
  };

  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user ? (
    <div>
      asd
    </div>
  ) : (
    'loading...'
  );
}
