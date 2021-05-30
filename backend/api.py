#!flask/bin/python
from flask import Flask, jsonify, request
import json
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from aimodel import predict_track


CLIENT_ID = 'b6cd81e8a5ff4daf82c105adf465fdf4'
CLIENT_SECRET = '3f0b8216a8f24db1b8bd0fa6efe0fe63'
REDIRECT_URI = 'https://www.google.com/'

spoty_api = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                                      client_secret=CLIENT_SECRET,
                                                      redirect_uri=REDIRECT_URI,
                                                      scope="user-library-read"))


app = Flask(__name__)

@app.route('/album_mood/<a>/', methods=['GET'])
def get_tasks(a):
    album = spoty_api.playlist(a)
    tracks_ids = [element['track']['id'] for element in album['tracks']['items']]
    tracks = spoty_api.audio_features(tracks=tracks_ids)
    print(predict_track(tracks))

    return jsonify({ 'tt': album})

if __name__ == '__main__':
    app.run(debug=True)