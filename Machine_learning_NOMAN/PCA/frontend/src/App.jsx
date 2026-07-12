import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import BatchUpload from './pages/BatchUpload';
import History from './pages/History';
import Visualizations from './pages/Visualizations';
import { fetchModelInfo } from './api';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [modelInfo, setModelInfo] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('predictHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchModelInfo().then(setModelInfo).catch(() => setModelInfo(null));
  }, []);

  useEffect(() => {
    localStorage.setItem('predictHistory', JSON.stringify(history));
  }, [history]);

  const addHistory = (entry) => {
    setHistory(prev => [{ id: Date.now(), timestamp: new Date().toLocaleString(), ...entry }, ...prev]);
  };

  const clearHistory = () => setHistory([]);

  const pages = { dashboard: 'Dashboard', assessment: 'New Assessment', batch: 'Batch Upload', history: 'History', visualizations: 'Visualizations' };

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} onNavigate={setActivePage} modelInfo={modelInfo} />
      <main className="main-content">
        <Header title={pages[activePage]} />
        <div className="page-content">
          {activePage === 'dashboard' && <Dashboard modelInfo={modelInfo} history={history} />}
          {activePage === 'assessment' && <Assessment onResult={addHistory} modelInfo={modelInfo} />}
          {activePage === 'batch' && <BatchUpload />}
          {activePage === 'history' && <History history={history} onClear={clearHistory} />}
          {activePage === 'visualizations' && <Visualizations />}
        </div>
        <footer className="app-footer">
          <p><i className="fas fa-shield-alt"></i> For educational purposes only. Not a substitute for professional medical advice.</p>
        </footer>
      </main>
    </div>
  );
}
