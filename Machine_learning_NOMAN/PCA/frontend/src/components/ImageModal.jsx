export default function ImageModal({ src, onClose }) {
  return (
    <div className={`modal ${src ? 'open' : ''}`} onClick={onClose}>
      <span className="modal-close">&times;</span>
      {src && <img className="modal-content" src={src} alt="visualization" />}
    </div>
  )
}
