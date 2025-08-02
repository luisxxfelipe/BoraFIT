import cv2
from .pose_service import analyze_pose, extract_landmarks
from .heatmap_service import generate_heatmap
import numpy as np

def analyze_video(video_path: str):
    cap = cv2.VideoCapture(video_path)
    frame_landmarks = []
    heatmap_accum = None
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        results = analyze_pose(frame)
        landmarks = extract_landmarks(results)
        frame_landmarks.append(landmarks)
        frame_heatmap = generate_heatmap(frame, results)
        if heatmap_accum is None:
            heatmap_accum = np.zeros_like(frame_heatmap)
        heatmap_accum = cv2.add(heatmap_accum, frame_heatmap)
    cap.release()
    return {
        "landmarks": frame_landmarks,
        "heatmap": heatmap_accum
    }
