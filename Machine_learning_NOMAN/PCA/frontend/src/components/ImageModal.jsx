export default function ImageModal({ src, onClose }) {
  if (!src) return null
  return (
    <div className="modal" onClick={onClose}>
      <span className="modal-close">&times;</span>
      <img className="modal-content" src={src} />
    </div>
  )
}
