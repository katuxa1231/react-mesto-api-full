import { createRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить'
  const avatarUrl = createRef()

  function handleSubmit(event) {
    event.preventDefault()

    onUpdateAvatar(avatarUrl.current.value)
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   buttonText={buttonText}>
      <div className="form__input-wrapper">
        <input
          id="avatar-url"
          name="avatar"
          className="form__input"
          type="url"
          placeholder="Ссылка на аватар"
          required=""
          ref={avatarUrl}
        />
        <span className="avatar-url-error form__input-error"/>
      </div>
    </PopupWithForm>
  )
}
