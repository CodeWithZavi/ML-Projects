import { useState, useRef } from 'react';
import { predictBatch } from '../api';

export default function BatchUpload() {
  const [records, setRecords] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);
  const dropRef = useRef(null);

  const REQUIRED_COLS = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope', 'Sex_M', 'ChestPainType_ATA', 'ChestPainType_NAP', 'ChestPainType_TA'];

  const processCSV = (text) => {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return alert('CSV must have a header row + at least 1 data row');
    const headers = lines[0].split(',').map(h => h.trim());
    const missing = REQUIRED_COLS.filter(c => !headers.includes(c));
    if (missing.length) return alert(`Missing columns: ${missing.join(', ')}`);

    const data = lines.slice(1).map((line, i) => {
      const vals = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((h, j) => { row[h] = isNaN(vals[j]) ? vals[j] : Number(vals[j]); });
      return row;
    });
    setRecords(data);
    setResults(null);
  };

  const handleFile = (file) => {
    if (!file || !file.name.endsWith('.csv')) return alert('Please upload a .csv file');
    const reader = new FileReader();
    reader.onload = (e) => processCSV(e.target.result);
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRun = async () => {
    if (!records) return;
    setLoading(true);
    setProgress(0);
    try {
      const res = await predictBatch(records);
      setResults(res.results || []);
      setProgress(100);
    } catch {
      alert('Batch prediction failed. Is the server running?');
    }
    setLoading(false);
  };

  const exportCSV = () => {
    if (!results) return;
    const headers = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope', 'Sex_M', 'ChestPainType_ATA', 'ChestPainType_NAP', 'ChestPainType_TA', 'Prediction', 'Confidence'];
    const rows = results.map(r => headers.map(h => r[h] ?? '').join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'batch_predictions.csv'; a.click();
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3><i className="fas fa-upload"></i> Batch Prediction</h3>
          <p>Upload a CSV file with multiple patient records for bulk assessment</p>
        </div>
        <div className="card-body">
          <div
            className="upload-area"
            ref={dropRef}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
          >
            <i className="fas fa-cloud-arrow-up upload-icon"></i>
            <p>Drag & drop your CSV file here or <strong>browse</strong></p>
            <p className="upload-hint">Required columns: {REQUIRED_COLS.join(', ')}</p>
            <input type="file" ref={fileRef} accept=".csv" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
          </div>
          {records && <p className="mt-2">Loaded <strong>{records.length}</strong> records</p>}
          <button className="btn-primary mt-4" onClick={handleRun} disabled={!records || loading}>
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : <><i className="fas fa-play"></i> Run Batch Prediction</>}
          </button>
          {records && !loading && (
            <div className="table-wrapper mt-4" style={{ maxHeight: '300px' }}>
              <table className="data-table">
                <thead><tr>{REQUIRED_COLS.map(c => <th key={c}>{c}</th>)}</tr></thead>
                <tbody>
                  {records.slice(0, 10).map((r, i) => (
                    <tr key={i}>{REQUIRED_COLS.map(c => <td key={c}>{r[c] ?? ''}</td>)}</tr>
                  ))}
                </tbody>
              </table>
              {records.length > 10 && <p className="mt-2">Showing first 10 of {records.length} records</p>}
            </div>
          )}
        </div>
      </div>

      {results && (
        <div className="card mt-4">
          <div className="card-header">
            <h3><i className="fas fa-table"></i> Batch Results</h3>
            <span className="badge">{results.length} predictions</span>
          </div>
          <div className="card-body table-wrapper">
            <table className="data-table" id="batchResultsTable">
              <thead>
                <tr>
                  <th>#</th>
                  {REQUIRED_COLS.map(c => <th key={c}>{c}</th>)}
                  <th>Prediction</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className={r.Prediction === 1 ? 'row-danger' : 'row-success'}>
                    <td>{i + 1}</td>
                    {REQUIRED_COLS.map(c => <td key={c}>{r[c] ?? ''}</td>)}
                    <td><span className={`badge ${r.Prediction === 1 ? 'badge-danger' : 'badge-success'}`}>{r.Prediction === 1 ? 'High Risk' : 'Low Risk'}</span></td>
                    <td>{r.Confidence ? `${(r.Confidence * 100).toFixed(1)}%` : '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button className="btn-secondary" onClick={exportCSV}><i className="fas fa-download"></i> Export CSV</button>
          </div>
        </div>
      )}
    </>
  );
}
