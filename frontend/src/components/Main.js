import { useContext } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)

  function handleEditAvatarClick() {
    onEditAvatar()
  }

  function handleEditProfileClick() {
    onEditProfile()
  }

  function handleAddPlaceClick() {
    onAddPlace()
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <button className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}
                  onClick={handleEditAvatarClick}/>
          <div className="profile__info">
            <div className="profile__wrap">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                aria-label="Редактировать"
                onClick={handleEditProfileClick}
              />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" aria-label="Добавить" onClick={handleAddPlaceClick}/>
      </section>
      <section>
        <ul className="photo-cards">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  )
}
