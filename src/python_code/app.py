# !pip install Flask Flask-Cors pyngrok tensorflow pillow

# Install required libraries (uncomment these lines if running in Colab or a fresh environment)
# !pip install Flask Flask-Cors pyngrok tensorflow pillow

from flask import Flask, request, jsonify
from flask_cors import CORS
from pyngrok import ngrok
import tensorflow as tf
import numpy as np
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
import requests
from PIL import Image
from io import BytesIO

# Load the pre-trained MobileNetV2 model
model = MobileNetV2(weights="imagenet")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Helper function to preprocess and classify an image
def classify_image(image_url):
    try:
        # Download the image from the provided URL
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content)).resize((224, 224))  # Resize image to model input size
        image_array = np.array(image)
        
        # Ensure the image has 3 color channels (RGB)
        if image_array.shape[-1] != 3:  
            image_array = np.stack([image_array] * 3, axis=-1)
        
        # Preprocess the image for MobileNetV2
        image_array = preprocess_input(image_array)
        image_array = np.expand_dims(image_array, axis=0)

        # Get predictions
        predictions = model.predict(image_array)
        decoded = decode_predictions(predictions, top=1)[0]
        return decoded[0][1], decoded[0][2]  # Return label and confidence score
    except Exception as e:
        return str(e), 0.0

# Route to analyze food
@app.route('/analyze', methods=['POST'])
def analyze_food():
    try:
        # Get JSON payload
        data = request.json
        image_url = data.get('image_url')
        if not image_url:
            return jsonify({"error": "Image URL is required"}), 400

        # Classify the image
        food, confidence = classify_image(image_url)

        # Convert confidence to Python float for JSON serialization
        confidence = float(confidence)

        # Check if the food is restricted
        restricted_foods = ["pizza", "burger", "soda"]
        suitability = "Not suitable for health" if food.lower() in restricted_foods else "Safe to eat"

        # Return the response
        return jsonify({
            "food": food,
            "confidence": confidence,
            "suitability": suitability
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Root route to verify the app is running
@app.route('/')
def home():
    return "Flask app is running! Use the /analyze endpoint to classify food images."

# Start Flask app and Ngrok tunnel
if __name__ == "__main__":
    # Set up Ngrok tunnel
    ngrok.set_auth_token("2rlMq7x6x2untZJfUMIuomTZFSu_7Scd1hBLsEPiCZ7qqZ3xU")  # Replace with your Ngrok auth token
    public_url = ngrok.connect(5000)
    print("Public URL:", public_url)

    # Start Flask server
    app.run(port=5000)