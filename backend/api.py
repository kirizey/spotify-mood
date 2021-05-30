#!flask/bin/python
from flask import Flask, jsonify, request
import json
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask_cors import CORS

from aimodel import predict_track
from spotify import spoty_api
import utils

CLIENT_ID = 'b6cd81e8a5ff4daf82c105adf465fdf4'
CLIENT_SECRET = '3f0b8216a8f24db1b8bd0fa6efe0fe63'
REDIRECT_URI = 'https://www.google.com/'

app = Flask(__name__)
CORS(app)


    
@app.route('/playlist/<id>/', methods=['GET'])
def get_playlist(id):
    playlist = spoty_api.playlist(id)
    tracks_ids = [element['track']['id'] for element in playlist['tracks']['items']]
    tracks = spoty_api.audio_features(tracks=tracks_ids)
    mood = predict_track(tracks)

    return jsonify({ 'playlist': playlist, 'mood':mood.tolist() })

@app.route('/playlists/<category>/', methods=['GET'])
def get_playlists(category):
    playlists = utils.get_playlists(spoty_api, category)

    return jsonify(playlists)

@app.route('/categories/', methods=['GET'])
def get_categories():
    categories = utils.get_categories(spoty_api)

    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True)