import pandas as pd
import numpy as np
import csv
import os,time
from joblib import load


import warnings
warnings.filterwarnings('ignore')

# Creating files if do not exitst
if not os.path.exists('data/classification.txt'):
    with open('data/classification.txt','w'): pass

# if not os.path.exists('data/rawdata.csv'):
#     with open('data/rawdata.csv','w'): pass

raw_csv_file = 'data/rawdata.csv'
COLUMNS = ["timestamp","x-axis","y-axis","z-axis"]

LABELS = {
    0 : "walking",
    1 : "standing",
    2 : "sitting",
    3 : "jogging",
    4 : "walking up stairs",
    5 : "walking down staris"
}
model = load('models/nn_100_relu.joblib')

def calc_magnitude(activity_df):
    x2 = activity_df["x-axis"].pow(2)
    y2 = activity_df["y-axis"].pow(2)
    z2 = activity_df["z-axis"].pow(2)
    m = x2+y2+z2
    return m.pow(0.5)

def rms(activity_axis):
    return np.sqrt((activity_axis * activity_axis).sum() / activity_axis.count())

def extract_features_from_window(activity_axis):
    return [
        activity_axis.mean(),
        activity_axis.min(),
        activity_axis.max(),
        activity_axis.std(),
        activity_axis.var(),
        rms(activity_axis),
    ]

def extract_features(activity_df):
    feature_vector = []
    row_count = activity_df["x-axis"].count()
    for axis in ["x-axis","y-axis","z-axis","magnitude"]:
        feature_vector.extend(extract_features_from_window(activity_df[axis]))
    return feature_vector

last_modified = os.stat(raw_csv_file).st_mtime

while True:
    file_stats = os.stat(raw_csv_file)
    if file_stats.st_mtime != last_modified:
        activity_df = pd.read_csv(raw_csv_file,names=COLUMNS)
        activity_df = activity_df.apply(pd.to_numeric)
        activity_df["magnitude"] = calc_magnitude(activity_df)
        feature_vector = extract_features(activity_df)
        predicted_label = model.predict([feature_vector])
        print(predicted_label)
        predicted_activity = LABELS[predicted_label[0]]
        print(predicted_label)

        with open('data/classification.txt', 'w') as f:
            f.truncate()
            f.write(predicted_activity)

        last_modified = file_stats.st_mtime
    else:
        print("file didn't change")
    time.sleep(0.5)
