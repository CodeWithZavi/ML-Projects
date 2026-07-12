const API_BASE = 'http://127.0.0.1:5000';

export async function fetchModelInfo() {
  const res = await fetch(`${API_BASE}/model_info`);
  if (!res.ok) throw new Error('Failed to fetch model info');
  return res.json();
}

export async function predictSingle(data) {
  const res = await fetch(`${API_BASE}/get_prediction_of_heart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Prediction failed');
  return res.json();
}

export async function predictBatch(records) {
  const res = await fetch(`${API_BASE}/batch_predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ records }),
  });
  if (!res.ok) throw new Error('Batch prediction failed');
  return res.json();
}
