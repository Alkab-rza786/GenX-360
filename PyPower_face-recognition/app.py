from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import argparse
import imutils
import pickle
import cv2
import os
import random

app = Flask(__name__)
CORS(app)

# create a route for face recognition
@app.route("/predict", methods=["POST"])
def recognize_face():
    # Get the image from the request
    file = request.files["image"]
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    image = imutils.resize(image, width=600)
    (h, w) = image.shape[:2]

    # Load the model
    print("[INFO] loading face detector...")
    protoPath = os.path.sep.join(["face_detection_model", "deploy.prototxt"])
    modelPath = os.path.sep.join(["face_detection_model", "res10_300x300_ssd_iter_140000.caffemodel"])
    detector = cv2.dnn.readNetFromCaffe(protoPath, modelPath)

    print("[INFO] loading face recognizer...")
    embedder = cv2.dnn.readNetFromTorch("openface_nn4.small2.v1.t7")

    recognizer = pickle.loads(open("output/PyPower_recognizer.pickle", "rb").read())
    le = pickle.loads(open("output/PyPower_label.pickle", "rb").read())

    # Prepare the image
    imageBlob = cv2.dnn.blobFromImage(
        cv2.resize(image, (300, 300)), 1.0, (300, 300),
        (104.0, 177.0, 123.0), swapRB=False, crop=False)

    detector.setInput(imageBlob)
    detections = detector.forward()

    results = []

    # Loop through the detections
    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        # filter out weak detections
        if confidence > 0.5:
            # compute the bounding box for the face
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype("int")

            # extract the face ROI
            face = image[startY:endY, startX:endX]
            (fH, fW) = face.shape[:2]

            # ensure the face width and height are sufficiently large
            if fW < 20 or fH < 20:
                continue

            # construct a blob for the face ROI, then pass the blob
            # through our face embedding model to obtain the 128-d
            faceBlob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96),
                                             (0, 0, 0), swapRB=True, crop=False)
            embedder.setInput(faceBlob)
            vec = embedder.forward()

            # perform classification to recognize the face
            preds = recognizer.predict_proba(vec)[0]
            j = np.argmax(preds)
            proba = preds[j]
            name = le.classes_[j]

            # assign email based on name
            random_domains = ["gmail.com", "yahoo.com", "outlook.com"]
            if name.lower() == "virat kohli":
                email="virat@gmail.com"
                password="virat123"
            elif name.lower() == "anish kumar":
                email="anish@gmail.com"
                password="anish123"
            elif name.lower() == "narendramodi":
                email = "narendramodi@gmail.com"
                password ="modi123"

            elif name.lower() == "alkab":
                email = "alkabrza61@gmail.com",
                password = "alkab123"
            else:
                email = f"{name.lower()}{random.randint(100, 999)}@{random.choice(random_domains)}"
                password = "default123"

            # Save the result to send back to React
            result = {
                "name": name,
                "email": email,
                "password":password,
                "confidence": float(proba)
            }
            results.append(result)

            # Optionally, you can draw on the image here if you want to return an image too
            text = "{}: {:.2f}%".format(name, proba * 100)
            y = startY - 10 if startY - 10 > 10 else startY + 10
            cv2.rectangle(image, (startX, startY), (endX, endY), (0, 0, 255), 2)
            cv2.putText(image, text, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.60, (0, 0, 255), 2)

    # Optionally, you can send the image back as well:
    # _, img_encoded = cv2.imencode('.jpg', image)
    # return jsonify({"image": base64.b64encode(img_encoded.tobytes()).decode('utf-8')})

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
