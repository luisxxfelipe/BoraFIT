import type { NovaFichaIAData, PoseData } from "../components/treinos/NovaFichaModal";

import { API_URLS } from '../config/api';

export async function analyzePosesIA(data: NovaFichaIAData & { poses: PoseData[] }) {
  const response = await fetch(API_URLS.analyzeIA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await response.json();
}
