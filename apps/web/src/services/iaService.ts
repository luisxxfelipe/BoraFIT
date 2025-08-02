
export async function analyzePosesIA({ restricoes, preferencias, poses }: { restricoes: string, preferencias: number | undefined, poses: any[] }) {
  const response = await fetch('http://localhost:3000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ restricoes, preferencias, poses }),
  });
  return await response.json();
}
