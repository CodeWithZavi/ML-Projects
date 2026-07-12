export default function ResultCard({ result }) {
  if (!result) return null
  const isPositive = result.prediction === 1
  return (
    <div className={`result-card visible ${isPositive ? 'positive' : 'negative'}`}>
      <div className="result-icon">
        <i className={`fas fa-${isPositive ? 'heart-circle-exclamation' : 'heart-circle-check'}`}></i>
      </div>
      <div className="result-body">
        <h3>{isPositive ? 'High Risk Detected' : 'Low Risk Detected'}</h3>
        <p>{isPositive ? 'Likelihood of heart disease. Please consult a cardiologist.' : 'No strong indicators found. Maintain a healthy lifestyle!'}</p>
        <div className="result-meta">
          {result.confidence != null && (
            <span className="meta-badge">Confidence: {(result.confidence * 100).toFixed(1)}%</span>
          )}
          {result.model_name && (
            <span className="meta-badge">Model: {result.model_name}</span>
          )}
          <span className="meta-badge">{new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
