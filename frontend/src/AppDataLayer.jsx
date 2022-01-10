import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import { MOODS } from './App';
import httpClient from './httpClient';
import { useAppDispatch } from './store';
import qs from 'query-string';
import { setMaxMood } from './store/clientSlice';

export default function AppDataLayer({ children }) {
  const spotifyAuthToken = useContext(SpotifyApiContext);
  const dispatch = useAppDispatch();

  const loadAvgMood = async () => {
    const query = qs.stringify({
      limit: 50,
    });
    const { data: songsData } = await axios.get(`https://api.spotify.com/v1/me/player/recently-played?${query}`, {
      headers: {
        authorization: `Bearer ${spotifyAuthToken}`,
      },
    });
    const songsIds = songsData.items.map((i) => i.track.id);
    const { data: moodData } = await httpClient.post('/tracks', { track_ids: songsIds });
    const moodTable = {
      [MOODS.calm]: 0,
      [MOODS.energetic]: 0,
      [MOODS.happy]: 0,
      [MOODS.sad]: 0,
    };
    moodData.forEach((md) => (moodTable[md.mood] += 1));
    const moodTableCounts = Object.values(moodTable);
    const maxMoodIndex = moodTableCounts.indexOf(Math.max(...moodTableCounts));
    const maxMoodName = Object.keys(moodTable)[maxMoodIndex]

    dispatch(setMaxMood(maxMoodName));
  };

  useEffect(() => {
    if (spotifyAuthToken) loadAvgMood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyAuthToken]);

  return <>{children}</>;
}
