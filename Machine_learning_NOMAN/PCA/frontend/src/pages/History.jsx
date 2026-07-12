import { useState } from 'react';

const PAGE_SIZE = 10;

function exportCSV(history) {
  const headers = ['Date/Time', 'Age', 'Sex', 'RestingBP', 'Cholesterol', 'Result', 'Confidence'];
  const rows = history.map(h => [
    h.timestamp, h.age, h.Sex_M === 1 ? 'Male' : 'Female',
    h.RestingBP, h.Cholesterol,
    h.result === 1 ? 'High Risk' : 'Low Risk',
    h.confidence ? `${(h.confidence * 100).toFixed(1)}%` : '--',
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'prediction_history.csv'; a.click();
}

export default function History({ history, onClear }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(history.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = history.slice(start, start + PAGE_SIZE);

  return (
    <div className="card">
      <div className="card-header">
        <h3><i className="fas fa-clock-rotate"></i> Prediction History</h3>
        <p>Recent patient assessments and their results</p>
      </div>
      <div className="card-body">
        <div className="history-actions">
          <span className="history-count">{history.length} total assessments</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {history.length > 0 && (
              <>
                <button className="btn-secondary btn-sm" onClick={() => exportCSV(history)}>
                  <i className="fas fa-download"></i> Export CSV
                </button>
                <button className="btn-secondary btn-sm" onClick={onClear}>
                  <i className="fas fa-trash-can"></i> Clear All
                </button>
              </>
            )}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date/Time</th>
                <th>Age</th>
                <th>Sex</th>
                <th>RestingBP</th>
                <th>Cholesterol</th>
                <th>Result</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={8} className="empty-state">No assessments yet.</td></tr>
              ) : (
                pageItems.map((h, i) => (
                  <tr key={h.id} className={h.result === 1 ? 'row-danger' : 'row-success'}>
                    <td>{start + i + 1}</td>
                    <td>{h.timestamp}</td>
                    <td>{h.age}</td>
                    <td>{h.Sex_M === 1 ? 'Male' : 'Female'}</td>
                    <td>{h.RestingBP}</td>
                    <td>{h.Cholesterol}</td>
                    <td>
                      <span className={`badge ${h.result === 1 ? 'badge-danger' : 'badge-success'}`}>
                        {h.result === 1 ? 'High Risk' : 'Low Risk'}
                      </span>
                    </td>
                    <td>{h.confidence ? `${(h.confidence * 100).toFixed(1)}%` : '--'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={safePage === 1} onClick={() => setPage(safePage - 1)}><i className="fas fa-chevron-left"></i></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={safePage === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}><i className="fas fa-chevron-right"></i></button>
          </div>
        )}
      </div>
    </div>
  );
}
