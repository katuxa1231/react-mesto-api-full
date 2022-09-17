import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some(item => item._id === currentUser._id)
  const cardDeleteButtonClassName = `photo-card__delete-button ${!isOwn && 'photo-card__delete-button_hidden'}`
  const cardLikeButtonClassName = `photo-card__like-button ${isLiked && 'photo-card__like-button_active'}`

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="photo-card">
      <img className="photo-card__image" alt={card.name} src={card.link} onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
      <div className="photo-card__wrap">
        <h2 className="photo-card__title">{card.name}</h2>
        <div className="photo-card__like-wrapper">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <p className="photo-card__like-counter">
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  )
}
