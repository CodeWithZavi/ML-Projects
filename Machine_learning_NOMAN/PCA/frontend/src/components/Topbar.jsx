import { useState, useEffect } from 'react'

export default function Topbar({ title, subtitle }) {
  const [date, setDate] = useState('')

  useEffect(() => {
    const d = new Date()
    setDate(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  return (
    <header className="topbar">
      <button className="sidebar-toggle" onClick={() => document.querySelector('.sidebar')?.classList.toggle('open')}>
        <i className="fas fa-bars"></i>
      </button>
      <div className="topbar-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-right">
        <span className="topbar-date">{date}</span>
      </div>
    </header>
  )
}
