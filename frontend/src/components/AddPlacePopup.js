import { PopupWithForm } from './PopupWithForm';
import { useState } from 'react';

export function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
  const buttonText = isLoading ? 'Загрузка...' : 'Создать'
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLinkChange(event) {
    setLink(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    onAddCard(name, link)
  }

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={isOpen} onClose={onClose}
                   onSubmit={handleSubmit}
                   buttonText={buttonText}>
      <div className="form__input-wrapper">
        <input
          id="place-input"
          name="name"
          className="form__input form__input-place"
          type="text"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleNameChange}
        />
        <span className="place-input-error form__input-error"/>
      </div>
      <div className="form__input-wrapper">
        <input
          id="url-input"
          name="link"
          className="form__input form__input-url"
          type="url"
          placeholder="Ссылка на картинку"
          required=""
          value={link}
          onChange={handleLinkChange}
        />
        <span className="url-input-error form__input-error"/>
      </div>
    </PopupWithForm>
  )
}
