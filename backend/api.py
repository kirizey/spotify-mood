#!flask/bin/python
from flask import Flask, jsonify, request, make_response
import json
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask_cors import CORS
from io import StringIO
import csv


from aimodel import predict_track
from spotify import spoty_api
import utils

CLIENT_ID = 'b6cd81e8a5ff4daf82c105adf465fdf4'
CLIENT_SECRET = '3f0b8216a8f24db1b8bd0fa6efe0fe63'
REDIRECT_URI = 'http://localhost:3000'

app = Flask(__name__)
CORS(app)


@app.route('/playlists/<categoryId>/<playlistId>/', methods=['GET'])
def get_playlist(categoryId, playlistId):
    playlist = spoty_api.playlist(playlistId)
    tracks_ids = []

    for element in playlist['tracks']['items']:
        if(element and element['track'] and element['track']['id']):
            tracks_ids.append(element['track']['id'])

    tracks = spoty_api.audio_features(tracks=tracks_ids)
    mood = predict_track(tracks)
    result = []

    for element in mood:
        for elementJ in playlist['tracks']['items']:
            if (element['id'] == elementJ['track']['id']):
                result.append({
                    'id': elementJ['track']['id'],
                    'name': elementJ['track']['name'],
                    'artist': elementJ['track']['artists'][0]['name'],
                    'album': elementJ['track']['album']['name'],
                    'time_signature': element['time_signature'],
                    'mode': 'major' if element['mode'] == 1 else 'minor',
                    'release_date': elementJ['added_at'],
                    'acousticness': element['acousticness'],
                    'danceability': element['danceability'],
                    'duration_ms': element['duration_ms'],
                    'energy': element['energy'],
                    'instrumentalness': element['instrumentalness'],
                    'liveness': element['liveness'],
                    'loudness': element['loudness'],
                    'speechiness': element['speechiness'],
                    'tempo': element['tempo'],
                    'valence': element['valence'],
                    'popularity': elementJ['track']['popularity'],
                    'mood': element['mood'],
                })


    return jsonify({ 'playlist': playlist, 'mood':mood, 'analysis': result })

@app.route('/playlists/<categoryId>/<playlistId>/download-analysis', methods=['GET'])
def dowload_playlist_analysis(categoryId, playlistId):
    playlist = spoty_api.playlist(playlistId)
    tracks_ids = []

    for element in playlist['tracks']['items']:
        if(element and element['track'] and element['track']['id']):
            tracks_ids.append(element['track']['id'])

    tracks = spoty_api.audio_features(tracks=tracks_ids)
    mood = predict_track(tracks)
    result = []

    for element in mood:
        for elementJ in playlist['tracks']['items']:
            if (element['id'] == elementJ['track']['id']):
                result.append({
                    'time_signature': element['time_signature'],
                    'mode': 'major' if element['mode'] == 1 else 'minor',
                    'acousticness': element['acousticness'],
                    'danceability': element['danceability'],
                    'duration_ms': element['duration_ms'],
                    'energy': element['energy'],
                    'instrumentalness': element['instrumentalness'],
                    'liveness': element['liveness'],
                    'loudness': element['loudness'],
                    'speechiness': element['speechiness'],
                    'tempo': element['tempo'],
                    'valence': element['valence'],
                    'popularity': elementJ['track']['popularity'],
                    'mood': element['mood'],
                })

    # si = StringIO()
    # cw = csv.writer(si)
    # cw.writerows(result)
    # output = make_response(si.getvalue())
    # output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    # output.headers["Content-type"] = "text/csv"

    count = 0
    data_file = open('data_file.csv', 'w', newline='', encoding='utf-8')
    csv_writer = csv.writer(data_file)
    for emp in result:
        if count == 0:

            # Writing headers of CSV file
            header = emp.keys()
            csv_writer.writerow(header)
            count += 1

        # Writing data of CSV file
        csv_writer.writerow(emp.values())

    data_file.close()

    return result

@app.route('/tracks', methods=['POST'])
def get_tracks_mood():
    track_ids = request.json['track_ids']
    tracks = spoty_api.audio_features(tracks=track_ids)
    mood = predict_track(tracks)

    return jsonify(mood)

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
