import json
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import os

class GestureClassifier:
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            random_state=42,
            max_depth=10
        )
        self.label_encoder = {}
        self.gesture_names = []

    def prepare_features(self, landmarks):
        """Extract features from MediaPipe hand landmarks"""
        if not landmarks or len(landmarks) != 21:
            return None

        features = []
        # Extract x, y coordinates
        for landmark in landmarks:
            features.extend([landmark['x'], landmark['y']])

        # Calculate relative distances between key points
        wrist = landmarks[0]
        thumb_tip = landmarks[4]
        index_tip = landmarks[8]
        middle_tip = landmarks[12]
        ring_tip = landmarks[16]
        pinky_tip = landmarks[20]

        # Distance from wrist to fingertips
        features.extend([
            self.calculate_distance(wrist, thumb_tip),
            self.calculate_distance(wrist, index_tip),
            self.calculate_distance(wrist, middle_tip),
            self.calculate_distance(wrist, ring_tip),
            self.calculate_distance(wrist, pinky_tip)
        ])

        return np.array(features)

    def calculate_distance(self, point1, point2):
        """Calculate Euclidean distance between two points"""
        return np.sqrt((point1['x'] - point2['x'])**2 + (point1['y'] - point2['y'])**2)

    def train(self, training_data):
        """Train the gesture classifier"""
        X = []
        y = []

        for gesture_name, samples in training_data.items():
            self.gesture_names.append(gesture_name)
            for sample in samples:
                features = self.prepare_features(sample['landmarks'])
                if features is not None:
                    X.append(features)
                    y.append(gesture_name)

        if not X:
            raise ValueError("No valid training data found")

        X = np.array(X)
        y = np.array(y)

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        # Train model
        self.model.fit(X_train, y_train)

        # Evaluate
        y_pred = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Training completed with accuracy: {accuracy:.2f}")
        print("Classification Report:")
        print(classification_report(y_test, y_pred))

        return accuracy

    def save_model(self, filepath="gesture_model.pkl"):
        """Save trained model to file"""
        model_data = {
            'model': self.model,
            'gesture_names': self.gesture_names
        }
        with open(filepath, 'wb') as f:
            pickle.dump(model_data, f)
        print(f"Model saved to {filepath}")

def create_sample_training_data():
    """Create sample training data for demo purposes"""
    sample_data = {
        "hello": [
            {
                "landmarks": [
                    {"x": 0.5, "y": 0.5} for _ in range(21)
                ]
            }
        ],
        "thanks": [
            {
                "landmarks": [
                    {"x": 0.4 + i*0.01, "y": 0.6 + i*0.01} for i in range(21)
                ]
            }
        ],
        "please": [
            {
                "landmarks": [
                    {"x": 0.6 - i*0.01, "y": 0.4 + i*0.005} for i in range(21)
                ]
            }
        ]
    }

    with open("sample_training_data.json", "w") as f:
        json.dump(sample_data, f, indent=2)
    return sample_data

if __name__ == "__main__":
    training_data = create_sample_training_data()
    classifier = GestureClassifier()
    try:
        accuracy = classifier.train(training_data)
        classifier.save_model("gesture_model.pkl")
        print(f"Training completed successfully! Accuracy: {accuracy:.2f}")
    except Exception as e:
        print(f"Training failed: {e}")
