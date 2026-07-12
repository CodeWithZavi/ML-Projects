const VIZ_LIST = [
  { src: '/visualizations/target_distribution.png', title: 'Target Distribution', desc: 'Class balance between heart disease (1) and no disease (0)' },
  { src: '/visualizations/feature_distributions.png', title: 'Feature Distributions', desc: 'Histograms of Age, BP, Cholesterol, MaxHR, Oldpeak' },
  { src: '/visualizations/feature_boxplots.png', title: 'Box Plots', desc: 'Outlier visualization in numerical features' },
  { src: '/visualizations/categorical_distributions.png', title: 'Categorical Distributions', desc: 'Frequency of each category across all categorical features' },
  { src: '/visualizations/correlation_heatmap.png', title: 'Correlation Heatmap', desc: 'Feature relationships with the target variable' },
  { src: '/visualizations/accuracy_comparison.png', title: 'Accuracy Comparison', desc: 'Raw RandomForest vs 5 PCA-tuned models' },
  { src: '/visualizations/prf_comparison.png', title: 'Precision, Recall & F1-Score', desc: 'Performance metrics across all models' },
  { src: '/visualizations/confusion_matrix.png', title: 'Confusion Matrix', desc: 'TN / FP / FN / TP breakdown' },
];

export default function Visualizations() {
  return (
    <div className="card">
      <div className="card-header">
        <h3><i className="fas fa-chart-pie"></i> Data Visualizations</h3>
        <p>Exploratory data analysis and model performance charts</p>
      </div>
      <div className="card-body">
        <div className="viz-gallery">
          {VIZ_LIST.map((v, i) => (
            <div key={i} className="viz-item" onClick={() => window.open(v.src, '_blank')}>
              <h4>{v.title}</h4>
              <p className="viz-desc">{v.desc}</p>
              <img src={v.src} alt={v.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
