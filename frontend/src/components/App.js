import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';
import * as auth from '../utils/auth';
import { AppRoute, tooltipMessage, TooltipType } from '../utils/constants';
import { InfoTooltip } from './InfoTooltip';

function App() {
  const history = useHistory()
  const [cards, setCards] = useState([])
  const [isEditProfilePopupOpen, setEditProfilePopupVisibility] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupVisibility] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupVisibility] = useState(false)
  const [tooltipParams, setTooltipParams] = useState({ isOpen: false, type: TooltipType.success, message: '' })
  const [isLoading, setLoadingStatus] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, userData]) => {
          setCards(cards)
          setCurrentUser({ ...userData, email: currentUser.email })
        })
        .catch((err) => console.log(`Error: ${err}`))
    }
  }, [loggedIn])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.getUser(token)
        .then((res) => {
          if (res) {
            setCurrentUser({ email: res.data.email })
            setLoggedIn(true)
            history.push('/')
          }
        })
        .catch((err) => console.log(`Error: ${err.status}`))
    }
  }, [])

  function handleLogin(email, password) {
    auth.logIn(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token)
        }
        setCurrentUser({ email })
        setLoggedIn(true)
        history.push('/')
      })
      .catch((err) => {
        err.json().then((e) => {
          openTooltip(TooltipType.failure, e.error || e.message || tooltipMessage.registration[TooltipType.failure])
        })
      })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        openTooltip(TooltipType.success, tooltipMessage.registration[TooltipType.success])
      })
      .catch((err) => {
        err.json().then((e) => {
          openTooltip(TooltipType.failure, e.error || e.message || tooltipMessage.registration[TooltipType.failure])
        })
      })
  }

  function onEditProfile() {
    setEditProfilePopupVisibility(true)
  }

  function onAddPlace() {
    setAddPlacePopupVisibility(true)
  }

  function onEditAvatar() {
    setEditAvatarPopupVisibility(true)
  }

  function closeAllPopups() {
    setEditProfilePopupVisibility(false)
    setAddPlacePopupVisibility(false)
    setEditAvatarPopupVisibility(false)
    setSelectedCard(null)
  }

  function closeTooltip() {
    setTooltipParams({...tooltipParams, isOpen: false})
  }

  function handleLogout() {
    localStorage.setItem('token', '')
    setLoggedIn(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(name, about) {
    setLoadingStatus(true)
    api.updateUserInfo(name, about)
      .then(userInfo => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingStatus(false))
  }

  function handleUpdateAvatar(avatar) {
    setLoadingStatus(true)
    api.updateUserAvatar(avatar)
      .then(userInfo => {
        setCurrentUser(userInfo)
        closeAllPopups()
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingStatus(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id)

    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item))
      })
      .catch((err) => console.log(`Error: ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(`Error: ${err}`))
  }

  function handleAddCard(name, link) {
    setLoadingStatus(true)
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => setLoadingStatus(false))
  }

  function openTooltip(type, message) {
    setTooltipParams({isOpen: true, type: type, message: message})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} handleLogout={handleLogout}/>
        <Switch>
          <ProtectedRoute
            exact path={AppRoute.root}
            component={Main}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}>
          </ProtectedRoute>
          <Route path={AppRoute.login}>
            <div className="container">
              <Login handleLogin={handleLogin}/>
            </div>
          </Route>
          <Route path={AppRoute.registration}>
            <div className="container">
              <Register handleRegister={handleRegister}/>
            </div>
          </Route>
          <Route>
            {loggedIn ? (<Redirect to={AppRoute.root}/>) : (<Redirect to={AppRoute.login}/>)}
          </Route>
        </Switch>
        <Footer/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}
                       isLoading={isLoading}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                          isLoading={isLoading}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading}/>
        <ImagePopup card={selectedCard} handleCloseButtonClick={closeAllPopups}/>
        <InfoTooltip params={tooltipParams} handleCloseButtonClick={closeTooltip} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
