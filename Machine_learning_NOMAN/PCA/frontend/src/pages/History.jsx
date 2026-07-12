export default function History({ history, onClear }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3><i className="fas fa-clock-rotate"></i> Prediction History</h3>
        <p>Recent patient assessments and their results</p>
      </div>
      <div className="card-body">
        <div className="history-actions">
          <span className="history-count">{history.length} total assessments</span>
          {history.length > 0 && (
            <button className="btn-secondary btn-sm" onClick={onClear}>
              <i className="fas fa-trash-can"></i> Clear All
            </button>
          )}
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
                history.map((h, i) => (
                  <tr key={h.id} className={h.result === 1 ? 'row-danger' : 'row-success'}>
                    <td>{i + 1}</td>
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
      </div>
    </div>
  );
}
