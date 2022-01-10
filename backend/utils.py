import time

def get_categories(s_client, ):
    categories = []
    for i in s_client.categories(limit = 50)['categories']['items']:
        categories.append(i)
    return categories

def get_playlists(s_client, category):
    playlists = []

    try:
        for playlist in s_client.category_playlists(category, limit = 12)['playlists']['items']:
            playlists.append(playlist)
    except:
        pass
    return playlists

def get_songs(s_client, playlists):
    song_ids = []
    for i in playlists:
        try:
            for j in s_client.user_playlist('spotify', i)['tracks']['items']:
                song_ids.append(j['track']['id'])
        except:
            pass
        time.sleep(.1)
    return song_ids
