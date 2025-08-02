import cv2
import numpy as np

def generate_heatmap(img: np.ndarray, results) -> np.ndarray:
    heatmap = np.zeros_like(img)
    if results.pose_landmarks:
        for lm in results.pose_landmarks.landmark:
            x = int(lm.x * img.shape[1])
            y = int(lm.y * img.shape[0])
            cv2.circle(heatmap, (x, y), 20, (0, 0, 255), -1)
    return heatmap

def save_heatmap(heatmap: np.ndarray, output_path: str):
    cv2.imwrite(output_path, heatmap)
    return output_path
