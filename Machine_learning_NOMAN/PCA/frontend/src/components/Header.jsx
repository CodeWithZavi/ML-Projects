export default function Header({ title, dark, onToggleTheme }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
      </div>
      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="topbar-date"><i className="fas fa-calendar"></i> {today}</span>
        <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
          <i className={`fas fa-${dark ? 'sun' : 'moon'}`}></i>
        </button>
      </div>
    </header>
  );
}
