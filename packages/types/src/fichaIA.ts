export interface NovaFichaIAData {
  restricoes: string;
  preferencias?: number;
  recomendacoes: string;
}

export interface PoseData {
  nome: string;
  landmarks: any;
  image_base64: string;
}
