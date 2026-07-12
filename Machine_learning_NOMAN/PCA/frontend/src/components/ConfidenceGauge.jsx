const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getColor(val) {
  if (val >= 0.7) return 'high';
  if (val >= 0.4) return 'medium';
  return 'low';
}

export default function ConfidenceGauge({ value, size = 'normal' }) {
  const pct = Math.min(Math.max((value ?? 0), 0), 1);
  const offset = CIRCUMFERENCE * (1 - pct);
  const cls = getColor(pct);
  const dim = size === 'small' ? 40 : 64;

  return (
    <div className="confidence-gauge">
      <div className="gauge-ring" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} viewBox="0 0 48 48">
          <circle className="gauge-ring-bg" cx="24" cy="24" r={RADIUS} />
          <circle
            className={`gauge-ring-fill ${cls}`}
            cx="24" cy="24" r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="gauge-label">{(pct * 100).toFixed(0)}%</span>
      </div>
      {size !== 'small' && (
        <div className="gauge-text">
          <span className="gauge-value">{(pct * 100).toFixed(1)}%</span>
          <span className="gauge-text-small">Confidence</span>
        </div>
      )}
    </div>
  );
}
