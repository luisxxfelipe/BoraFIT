
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def run_gemini_inference(poses, restricoes=None, preferencias=None):
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
        # ... pode expandir conforme necessário
    }
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
    prompt += "\nCada pose tem um nome e um array de landmarks, onde cada landmark representa um ponto anatômico (x, y, z, visibilidade). Os landmarks seguem o padrão MediaPipe Pose, conforme o dicionário abaixo:\n"
    for idx, nome in landmark_map.items():
        prompt += f"- {idx}: {nome}\n"
    prompt += "\nOs valores de x, y, z são normalizados entre 0 e 1, representando posições relativas no corpo humano. Visibilidade indica a confiança da detecção.\n"
    prompt += "\nATENÇÃO: As poses enviadas são focadas apenas do tronco/cintura para cima (ombros, coluna, braços, pescoço, cabeça). Não há dados completos dos membros inferiores. Foque sua análise e recomendações principalmente para postura, alinhamento, assimetrias e fortalecimento do tronco e membros superiores.\n"
    prompt += "\nOs nomes das poses seguem o padrão:\n"
    prompt += "- Pose 1: Frente do tronco\n- Pose 2: Perfil esquerdo do tronco\n- Pose 3: Perfil direito do tronco\n- Pose 4: Costas do tronco\n- Pose 5: Braços erguidos\n- Pose 6: Braços relaxados\n"
    prompt += "\nUse os landmarks e o mapa acima para identificar assimetrias, desvios posturais, desequilíbrios musculares e recomendações específicas para cada parte do tronco e membros superiores. Alguns landmarks podem ter visibilidade baixa: utilize todos os pontos disponíveis, considere padrões e simetrias para inferir postura e recomendações, mesmo com dados incompletos. Seja flexível e sempre sugira exercícios práticos para postura, fortalecimento e alongamento do tronco, ombros, pescoço e braços. Evite respostas genéricas.\n"
    prompt += "Se os dados forem insuficientes para uma análise completa, gere uma ficha de treino básica e genérica para postura, fortalecimento e alongamento do tronco e membros superiores. Nunca retorne ficha vazia ou mensagem de impossibilidade. Sempre forneça recomendações úteis e seguras.\n"
    prompt += "\nIMPORTANTE: Retorne SEMPRE a ficha de treino no formato JSON padronizado abaixo, dentro do campo 'ficha_treino'.\n"
    prompt += "Exemplo:\n"
    prompt += "'ficha_treino': [\n  {\n    'dia': 'Segunda',\n    'atividade': 'Postura',\n    'exercicios': [\n      { 'nome': 'Alongamento de Ombros', 'descricao': 'Alongamento dos músculos do trapézio, peitoral e deltoides para relaxar os ombros. Mantenha por 30 segundos.' },\n      { 'nome': 'Rotação de Ombros', 'descricao': 'Rotação de ombros para cima e para baixo. 10 repetições em cada direção.' }\n    ]\n  },\n  {\n    'dia': 'Quarta',\n    'atividade': 'Fortalecimento',\n    'exercicios': [\n      { 'nome': 'Remada', 'descricao': 'Utilize halteres ou caneleiras para fortalecer os músculos da coluna e das costas. 10 repetições por lado.' }\n    ]\n  }\n]\n"
    for pose in poses:
        lmk = pose.get('landmarks', 'N/A')
        if lmk is None:
            lmk = 'NÃO EXTRAÍDO'
        prompt += f"\n- {pose.get('nome', 'Pose')}: {lmk}"

    prompt += (
        "\nAnalise todas as poses e landmarks acima. Gere uma análise postural detalhada, identificando desvios, postura, recomendações específicas para cada parte do corpo. Em seguida, monte uma ficha de treino personalizada baseada nessas observações.\n"
        "Retorne o resultado EXATAMENTE neste formato JSON, sem explicações extras:\n"
        '{"observacao": "<observações posturais detalhadas>", "ficha_treino": <array de objetos conforme exemplo acima>}'
        "\nPreencha os campos com informações reais e detalhadas, sem inventar campos ou alterar a estrutura. O campo 'ficha_treino' deve ser sempre um array de objetos conforme o exemplo acima. Nunca retorne ficha vazia ou mensagem de impossibilidade."
    )

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
        obs = ''
        ficha = ''
        gemini_raw = response.text if response and hasattr(response, 'text') else ''
        if gemini_raw:
            import json
            try:
                parsed = json.loads(gemini_raw)
                obs = parsed.get('observacao', '').strip()
                ficha = parsed.get('ficha_treino', '').strip()
            except Exception:
                # fallback: tenta extrair manualmente se não vier JSON
                obs = gemini_raw
        return {
            "observacoes_posturais": obs,
            "ficha_treino": ficha,
            "gemini_raw": gemini_raw
        }
    except Exception as e:
        return {"error": str(e)}
