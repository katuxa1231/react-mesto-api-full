export function ImagePopup({ card, handleCloseButtonClick }) {
  return (
    <section className={`popup popup_view-image ${card && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" aria-label="Закрыть" onClick={handleCloseButtonClick}/>
        {!!card && <figure className="popup__figure">
          <img
            className="popup__image"
            alt={card.name}
            src={card.link}
          />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>}
      </div>
    </section>
  )
}
