import './styles/InfoTooltip.css'

export function InfoTooltip({ params, handleCloseButtonClick }) {
  return (
    <section className={`tooltip ${params.isOpen && 'tooltip_opened'}`}>
      <div className="tooltip__container">
        <button className="tooltip__close-button" aria-label="Закрыть" onClick={handleCloseButtonClick}/>
        <div className={`tooltip__image tooltip__image_${params.type}`}></div>
        <p className="tooltip__message">{params.message}</p>
      </div>
    </section>
  )
}
