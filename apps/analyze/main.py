from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import cv2
import numpy as np
from services.pose_analysis import analyze_pose, generate_heatmap, extract_landmarks, analyze_video, save_heatmap, run_ai_inference

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



from fastapi import Form

@app.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...),
    restricoes: str = Form(None),
    preferencias: str = Form(None)
):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    results = analyze_pose(img)
    heatmap = generate_heatmap(img, results)
    landmarks = extract_landmarks(results)
    _, heatmap_jpeg = cv2.imencode('.jpg', heatmap)
    heatmap_bytes = heatmap_jpeg.tobytes()
    # Chama IA com contexto completo
    ai_result = run_ai_inference(landmarks, restricoes, preferencias)
    return JSONResponse({
        "message": "Análise realizada com sucesso!",
        "landmarks": landmarks,
        "heatmap": list(heatmap_bytes),
        "ai_result": ai_result
    })

@app.get("/")
def root():
    return {"status": "API de análise corporal rodando!"}


# Novo endpoint para análise de vídeo
@app.post("/analyze_video")
async def analyze_video_endpoint(file: UploadFile = File(...)):
    temp_video_path = f"temp_{file.filename}"
    with open(temp_video_path, "wb") as f:
        f.write(await file.read())
    result = analyze_video(temp_video_path)
    heatmap_path = save_heatmap(result["heatmap"], f"heatmap_{file.filename}.png")
    ai_result = run_ai_inference(result["landmarks"])
    import os
    os.remove(temp_video_path)
    return JSONResponse({
        "message": "Análise de vídeo realizada com sucesso!",
        "landmarks": result["landmarks"],
        "heatmap_path": heatmap_path,
        "ai_result": ai_result
    })
