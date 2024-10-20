import tensorflow as tf
import pickle
from keras.preprocessing.sequence import pad_sequences
import numpy as np

def predict(resume_text):

    model_path = './model/resume_screening_model.keras'
    model = tf.keras.models.load_model(model_path)

    with open('./model/tokenizer.pkl', 'rb') as handle:
        tokenizer = pickle.load(handle)

    with open('./model/label_encoder.pkl', 'rb') as handle:
        label_encoder = pickle.load(handle)
    
    resume_text = [resume_text]
    seq = tokenizer.texts_to_sequences(resume_text)
    padded = pad_sequences(seq, maxlen=600)  # Keep the max_words to 600

    probabilities = model.predict(padded)[0]  

    predicted_label_index = np.argmax(probabilities)
    predicted_category = label_encoder.inverse_transform([predicted_label_index])[0]

    category_probabilities = {label_encoder.classes_[i]: probabilities[i] for i in range(len(probabilities))}

    return predicted_category, category_probabilities
