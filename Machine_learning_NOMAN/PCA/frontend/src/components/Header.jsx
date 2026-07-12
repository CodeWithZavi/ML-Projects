export default function Header({ title }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{title}</h1>
      </div>
      <div className="topbar-right">
        <span className="topbar-date"><i className="fas fa-calendar"></i> {today}</span>
      </div>
    </header>
  );
}
