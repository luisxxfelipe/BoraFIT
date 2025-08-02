
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def run_gemini_inference(poses, restricoes=None, preferencias=None):
    """
    poses: lista de dicts [{"nome": "Frente", "landmarks": ..., "image_base64": ...}, ...]
    """
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key:
        return {"error": "Chave Gemini não configurada"}
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("models/gemini-1.5-flash-8b")

    # Orientações para o usuário (frontend pode exibir antes de iniciar):
    orientacoes = [
        "Pose 1: Fique de frente para a câmera, braços relaxados ao lado do corpo.",
        "Pose 2: Fique de lado (perfil), braços relaxados.",
        "Pose 3: Fique de costas para a câmera, postura ereta.",
        "(Opcional) Pose funcional: agachamento ou outro movimento relevante."
    ]

    # Monta prompt multimodal após coletar todas as poses
    prompt = (
        f"Usuário com restrições: {restricoes if restricoes else 'Nenhuma'}, "
        f"preferência de horário: {preferencias if preferencias else 'Não informado'}. "
        "Foram coletadas as seguintes poses: "
    )
    for pose in poses:
        prompt += f"\n- {pose.get('nome', 'Pose')} (landmarks: {pose.get('landmarks', 'N/A')})"

    prompt += ("\nAnalise todas as poses e gere uma ficha de treino personalizada, recomendações de postura, exercícios e orientações detalhadas para o usuário. Retorne o resultado em formato de texto organizado para exibição no aplicativo.")

    parts = [{"text": prompt}]
    for pose in poses:
        if pose.get("image_base64"):
            parts.append({"inlineData": {"mimeType": "image/jpeg", "data": pose["image_base64"]}})

    contents = [{"role": "user", "parts": parts}]
    generation_config = {
        "temperature": 1.0,
        "max_output_tokens": 512,
    }
    try:
        response = model.generate_content(contents, generation_config=generation_config)
        return {
            "orientacoes": orientacoes,
            "recomendacoes_ia": response.text
        }
    except Exception as e:
        return {"error": str(e)}
