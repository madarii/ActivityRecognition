# ActivityRecognition
Real time human activity recognition using mobile phone's accelerometer

[![](https://video-to-markdown.netlify.com/.netlify/functions/image?url=https%3A%2F%2Fyoutu.be%2FTHZTw4RhvBQ)](https://youtu.be/THZTw4RhvBQ "")

## Android app for data collection
* Records accelerometer data and saves it in a csv file.
* Has timer to set the duration of recording
* Saves files in data collector folder
* Waits for 5 seconds before the recording starts(beep sound is made)
* download [link](https://drive.google.com/file/d/11enJBmw4d_ERNDbDte4jJqH5-XwvEaXo/view?usp=sharing)

## Setting up environment
### conda
```sh
$ conda env create -f AR.yml
$ conda activate AR
```
* requirements.txt is also provided

## Get the data
* Download the data on which I have trained the model on.[link](https://drive.google.com/file/d/1S4gtNMkLWxbLjzl9Clwnkg2jhg-GMf--/view?usp=sharing)
* Store the data in python/data/ folder, you will have to create the data folder.
* Or you can use the above app and collect your own data.

## Train the classifier
* Run the jupyter notebook in python folder and train the classifiers.Make sure data is stored in python/data directory
* Or else download this pre-trained model [link](https://drive.google.com/file/d/1koI55nVGpsy7FnkV-oy_KB_r4cT-_zGk/view?usp=sharing) and save it in python/models directory, you will have to create the models folder.
* You can change which model to load while running the app by changing the model name in activityRecognition.py 

## Install and run
```sh
$ npm install
$ npm start
# Server is running on port 3030
```
* Make sure you have the specified model in python/models folder.
* Open http://your_local_ip:3030/mobile.html on your smartphone.(chrome is not supported,it will show alert if phone is not supported)
* Open localhost:3030/monitor.html on your computer browser to see the classification results.
* keep phone in your pocket with screen facing the thigh and don't lock the phone.


