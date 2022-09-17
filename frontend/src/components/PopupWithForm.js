export function PopupWithForm(props) {
  function handleCloseButtonClick() {
    props.onClose()
  }

  return (
    <section className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_form">
        <button className="popup__close-button" aria-label="Закрыть" onClick={handleCloseButtonClick}/>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form form_${props.name}`} name={`form-${props.name}`} noValidate="" onSubmit={props.onSubmit}>
          {props.children}
          <button className="form__submit-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}
