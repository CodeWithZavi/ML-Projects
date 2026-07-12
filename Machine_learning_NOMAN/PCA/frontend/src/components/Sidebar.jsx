const navItems = [
  { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
  { id: 'assessment', icon: 'fa-stethoscope', label: 'New Assessment' },
  { id: 'batch', icon: 'fa-upload', label: 'Batch Upload' },
  { id: 'history', icon: 'fa-clock-rotate', label: 'History' },
  { id: 'visualizations', icon: 'fa-chart-simple', label: 'Visualizations' },
];

export default function Sidebar({ activePage, onNavigate, modelInfo }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <i className="fas fa-heart-pulse"></i>
        <span>CardioPredict</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="model-badge-sidebar">
          <i className="fas fa-microchip"></i>
          <span>Model: <strong>{modelInfo?.model_name?.split('/')[0]?.trim() || '--'}</strong></span>
          <span>Acc: <strong>{modelInfo?.accuracy ? `${(modelInfo.accuracy * 100).toFixed(1)}%` : '--'}</strong></span>
        </div>
      </div>
    </aside>
  );
}
