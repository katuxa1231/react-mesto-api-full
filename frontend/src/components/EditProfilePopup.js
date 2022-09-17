import { PopupWithForm } from './PopupWithForm';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const buttonText = isLoading ? 'Загрузка...' : 'Сохранить';

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name || '')
    setDescription(currentUser.about || '')
  }, [currentUser])

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   buttonText={buttonText}>
      <div className="form__input-wrapper">
        <input
          id="name-input"
          name="name"
          className="form__input form__input-name"
          type="text"
          required=""
          minLength={2}
          maxLength={40}
          placeholder="Имя"
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-input-error form__input-error"/>
      </div>
      <div className="form__input-wrapper">
        <input
          id="job-input"
          name="info"
          className="form__input form__input-job"
          type="text"
          required=""
          minLength={2}
          maxLength={200}
          placeholder="Дополнительная информация"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="job-input-error form__input-error"/>
      </div>
    </PopupWithForm>
  )
}
