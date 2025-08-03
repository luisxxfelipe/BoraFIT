from fastapi import FastAPI, Request, UploadFile, File
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

@app.post("/analyze")
async def analyze_json(request: Request):
    data = await request.json()
    restricoes = data.get("restricoes", "")
    preferencias = data.get("preferencias", "")
    poses = data.get("poses", [])
    # Validação: bloqueia se não houver pelo menos 3 poses ou se alguma pose não tiver imagem
    if not poses or len(poses) < 3:
        return JSONResponse({
            "error": "São necessárias pelo menos 3 poses para análise. Recomenda-se enviar até 6 poses completas para melhor resultado."
        }, status_code=400)
    if len(poses) > 6:
        return JSONResponse({
            "error": "O máximo suportado são 6 poses. Envie até 6 fotos completas de cada parte do corpo."
        }, status_code=400)
    for idx, pose in enumerate(poses):
        if not pose.get("image_base64") or not pose.get("nome"):
            return JSONResponse({
                "error": f"Informações da pose {idx+1} estão incompletas. Envie nome e imagem."
            }, status_code=400)
    # Mapa de landmarks MediaPipe Pose
    landmark_map = {
        0: "nariz",
        1: "olho esquerdo",
        2: "olho direito",
        3: "orelha esquerda",
        4: "orelha direita",
        5: "ombro esquerdo",
        6: "ombro direito",
        7: "cotovelo esquerdo",
        8: "cotovelo direito",
        9: "pulso esquerdo",
        10: "pulso direito",
        11: "quadril esquerdo",
        12: "quadril direito",
        13: "joelho esquerdo",
        14: "joelho direito",
        15: "tornozelo esquerdo",
        16: "tornozelo direito",
        17: "pé esquerdo (interno)",
        18: "pé direito (interno)",
        19: "pé esquerdo (externo)",
        20: "pé direito (externo)",
        21: "dedo polegar esquerdo",
        22: "dedo polegar direito",
        23: "dedo mindinho esquerdo",
        24: "dedo mindinho direito"
    }
    all_landmarks = []
    observacoes = []
    # Processa todas as poses e extrai landmarks corretamente
    for pose in poses:
        image_base64 = pose.get("image_base64")
        nome = pose.get("nome")
        import base64
        img_bytes = base64.b64decode(image_base64)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        results = analyze_pose(img)
        extracted_landmarks = extract_landmarks(results)
        print(f"Landmarks extraídos para {nome}:", extracted_landmarks)
        # Preenche landmarks no objeto da pose
        pose["landmarks"] = extracted_landmarks
        all_landmarks.append({"nome": nome, "landmarks": extracted_landmarks, "image_base64": image_base64, "landmark_map": landmark_map})
        # Observações por pose (pode ser customizado)
        obs_result = run_ai_inference([{"nome": nome, "landmarks": extracted_landmarks, "landmark_map": landmark_map}], restricoes, preferencias)
        obs = obs_result.get('observacao', '')
        gemini_raw = obs_result.get('gemini_raw', '')
        observacoes.append(f"Pose {nome}: {obs}\n[gemini_raw]: {gemini_raw}")
    # Observação geral (exemplo: pode ser customizado para analisar todas juntas)
    observacao_geral = "\n".join(observacoes)
    # Gera ficha de treino baseada nas landmarks e observações
    ficha_result = run_ai_inference(all_landmarks, restricoes, preferencias)
    ficha_treino = ficha_result.get('ficha_treino', 'Ficha não gerada.')
    gemini_raw_ficha = ficha_result.get('gemini_raw', '')
    return JSONResponse({
        "message": "Análise realizada com sucesso!",
        "observacoes_posturais": observacao_geral,
        "ficha_treino": ficha_treino,
        "gemini_raw_ficha": gemini_raw_ficha
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
