import os
import cv2
import numpy as np
from PIL import Image
from keras.models import load_model


model_path = os.path.join(os.path.dirname(__file__), r"model\fer2013_mini_XCEPTION.43-0.64.hdf5")
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at: {model_path}")
model = load_model(model_path, compile=False)

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']


def preprocess_image(img):
    # img may be a NumPy array
    if isinstance(img, np.ndarray):
        img = Image.fromarray(img)  # Convert numpy array to PIL Image
    img = img.convert('L')  # Convert to grayscale
    img = img.resize((64, 64))  # Resize to 64x64
    img_array = np.array(img)  # Convert back to numpy array
    img_array = img_array / 255.0  # Normalize
    # Reshape to (1, 64, 64, 1)
    img_array = img_array.reshape(1, 64, 64, 1)
    return img_array

def detect_emotion(image):
    processed_img = preprocess_image(image)
    prediction = model.predict(processed_img)
    emotion = emotion_labels[np.argmax(prediction)]
    return emotion
