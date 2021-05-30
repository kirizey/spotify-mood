import joblib
from sklearn import datasets
from sklearn import svm, datasets
import pandas as pd

loaded_model = joblib.load('finalized_model.sav')
target_names = ['Happy', 'Sad', 'Energetic', 'Calm']


def predict_track(track):
  pr = []
  list_track = []

  for count in track:
      try:
        pr.append(
          [
            count['duration_ms']/518373,
            count['danceability'],
            count['acousticness'],
            count['energy'], 
            count['instrumentalness'], 
            count['liveness'], 
            count['valence'],
            count['loudness'],
            count['speechiness'],
            count['tempo'],
            count['time_signature']
        ])
      except:
        pass

  pr = pd.DataFrame(data=pr, columns=[
    'duration_ms','danceability','acousticness',
  'energy','instrumentalness','liveness','valence','loudness','speechiness',
  'tempo','time_signature'
  ])

  predict = loaded_model.predict(pr)

  for i in range(len(track)):
    list_track.append({'id':track[i]['id'], 'mood': target_names[predict[i]] })

  return list_track
