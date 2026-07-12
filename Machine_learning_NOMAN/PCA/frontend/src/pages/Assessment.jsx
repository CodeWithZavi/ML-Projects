import { useState } from 'react';
import { predictSingle } from '../api';

const CHEST_OPTIONS = [
  { value: 'ASY', label: 'Asymptomatic (ASY)' },
  { value: 'ATA', label: 'Atypical Angina (ATA)' },
  { value: 'NAP', label: 'Non-Anginal Pain (NAP)' },
  { value: 'TA', label: 'Typical Angina (TA)' },
];

export default function Assessment({ onResult, modelInfo }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    age: '', RestingBP: '', Cholesterol: '', FastingBS: '0',
    RestingECG: '1', MaxHR: '', ExerciseAngina: '0', Oldpeak: '',
    ST_Slope: '3', Sex_M: '1', chestPain: 'ASY',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const chestPainVal = form.chestPain;
    const inputData = {
      age: parseInt(form.age), RestingBP: parseInt(form.RestingBP),
      Cholesterol: parseInt(form.Cholesterol), FastingBS: parseInt(form.FastingBS),
      RestingECG: parseInt(form.RestingECG), MaxHR: parseInt(form.MaxHR),
      ExerciseAngina: parseInt(form.ExerciseAngina), Oldpeak: parseFloat(form.Oldpeak),
      ST_Slope: parseInt(form.ST_Slope), Sex_M: parseInt(form.Sex_M),
      ChestPainType_ATA: chestPainVal === 'ATA' ? 1 : 0,
      ChestPainType_NAP: chestPainVal === 'NAP' ? 1 : 0,
      ChestPainType_TA: chestPainVal === 'TA' ? 1 : 0,
    };

    try {
      const res = await predictSingle(inputData);
      const isPositive = res.prediction === 1;
      setResult({
        prediction: res.prediction,
        confidence: res.confidence,
        label: isPositive ? 'High Risk' : 'Low Risk',
        color: isPositive ? 'danger' : 'success',
        message: isPositive
          ? 'The model indicates a likelihood of heart disease. Please consult a cardiologist.'
          : 'No strong indicators of heart disease found.',
      });
      onResult({ ...inputData, result: res.prediction, confidence: res.confidence });
    } catch {
      setResult({ label: 'Error', color: 'danger', message: 'Could not reach the prediction server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3><i className="fas fa-user-plus"></i> Patient Assessment Form</h3>
        <p>Enter patient vitals below for a real-time heart disease risk prediction</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label><i className="fas fa-calendar"></i> Age</label>
              <input type="number" id="age" placeholder="e.g. 45" value={form.age} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><i className="fas fa-venus-mars"></i> Sex</label>
              <select id="Sex_M" value={form.Sex_M} onChange={handleChange}>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label><i className="fas fa-weight"></i> Resting BP (mmHg)</label>
              <input type="number" id="RestingBP" placeholder="e.g. 120" value={form.RestingBP} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><i className="fas fa-droplet"></i> Cholesterol (mg/dL)</label>
              <input type="number" id="Cholesterol" placeholder="e.g. 200" value={form.Cholesterol} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row three-col">
            <div className="form-group">
              <label><i className="fas fa-flask"></i> Fasting Blood Sugar</label>
              <select id="FastingBS" value={form.FastingBS} onChange={handleChange}>
                <option value="0">Normal (&lt;126 mg/dL)</option>
                <option value="1">Elevated (&gt;126 mg/dL)</option>
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-heart"></i> Resting ECG</label>
              <select id="RestingECG" value={form.RestingECG} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">ST Abnormality</option>
                <option value="3">LV Hypertrophy</option>
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-chart-line"></i> Max Heart Rate</label>
              <input type="number" id="MaxHR" placeholder="e.g. 150" value={form.MaxHR} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row three-col">
            <div className="form-group">
              <label><i className="fas fa-running"></i> Exercise Angina</label>
              <select id="ExerciseAngina" value={form.ExerciseAngina} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label><i className="fas fa-wave-square"></i> Oldpeak</label>
              <input type="number" step="any" id="Oldpeak" placeholder="e.g. 1.2" value={form.Oldpeak} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label><i className="fas fa-arrow-trend-up"></i> ST Slope</label>
              <select id="ST_Slope" value={form.ST_Slope} onChange={handleChange}>
                <option value="3">Up</option>
                <option value="2">Flat</option>
                <option value="1">Down</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label><i className="fas fa-bolt"></i> Chest Pain Type</label>
              <select id="chestPain" value={form.chestPain} onChange={handleChange}>
                {CHEST_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className={`btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : <><i className="fas fa-microchip"></i> Run Assessment</>}
          </button>
        </form>
      </div>

      {result && (
        <div className={`result-card ${result.color}`}>
          <div className="result-icon">
            <i className={`fas ${result.prediction === 1 ? 'fa-heart-circle-exclamation' : 'fa-heart-circle-check'}`}></i>
          </div>
          <div className="result-body">
            <h3>{result.label}</h3>
            <p>{result.message}</p>
            <div className="result-meta">
              {result.confidence && <span className="meta-badge">Confidence: {(result.confidence * 100).toFixed(1)}%</span>}
              {modelInfo?.model_name && <span className="meta-badge">{modelInfo.model_name.split('/')[0]?.trim()}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
