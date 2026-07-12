export default function Dashboard({ modelInfo, history }) {
  const stats = [
    { label: 'Active Model', value: modelInfo?.model_name?.split('/')[0]?.trim() || '--', icon: 'fa-microchip', color: 'stat-blue' },
    { label: 'Accuracy', value: modelInfo?.accuracy ? `${(modelInfo.accuracy * 100).toFixed(1)}%` : '--', icon: 'fa-chart-line', color: 'stat-green' },
    { label: 'F1-Score', value: modelInfo?.f1_score ? `${(modelInfo.f1_score * 100).toFixed(1)}%` : '--', icon: 'fa-bullseye', color: 'stat-purple' },
    { label: 'Total Assessments', value: history.length.toString(), icon: 'fa-clipboard-check', color: 'stat-orange' },
  ];

  return (
    <>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card ${s.color}`}>
            <div className="stat-icon"><i className={`fas ${s.icon}`}></i></div>
            <div className="stat-info">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {modelInfo && (
        <div className="card mt-4">
          <div className="card-header">
            <h3><i className="fas fa-info-circle"></i> Deployed Model Details</h3>
          </div>
          <div className="card-body">
            <table className="info-table">
              <tbody>
                <tr><td>Model</td><td><strong>{modelInfo.model_name}</strong></td></tr>
                <tr><td>Accuracy</td><td>{(modelInfo.accuracy * 100).toFixed(2)}%</td></tr>
                <tr><td>Precision</td><td>{(modelInfo.precision * 100).toFixed(2)}%</td></tr>
                <tr><td>Recall</td><td>{(modelInfo.recall * 100).toFixed(2)}%</td></tr>
                <tr><td>F1-Score</td><td>{(modelInfo.f1_score * 100).toFixed(2)}%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header">
          <h3><i className="fas fa-chart-bar"></i> Model Accuracy Comparison</h3>
        </div>
        <div className="card-body">
          <img src="/visualizations/accuracy_comparison.png" alt="Accuracy Comparison" className="viz-img" />
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3><i className="fas fa-table-cells"></i> Confusion Matrix</h3>
        </div>
        <div className="card-body">
          <img src="/visualizations/confusion_matrix.png" alt="Confusion Matrix" className="viz-img" />
        </div>
      </div>
    </>
  );
}
