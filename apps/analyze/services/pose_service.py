import mediapipe as mp
import numpy as np

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

def analyze_pose(img: np.ndarray):
    results = pose.process(img)
    return results

def extract_landmarks(results):
    min_vis = 0.3  # Considera landmarks com visibilidade acima de 0.3
    if results.pose_landmarks:
        return [
            {
                "x": lm.x,
                "y": lm.y,
                "z": lm.z,
                "visibility": lm.visibility
            }
            for lm in results.pose_landmarks.landmark if lm.visibility >= min_vis
        ]
    return []
