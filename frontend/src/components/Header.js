import headerLogo from '../images/header-logo.svg';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Link, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../utils/constants';

export function Header({ loggedIn, handleLogout }) {
  const currentUser = useContext(CurrentUserContext)

  return (
    <header className="header">
      <img
        className="header__logo"
        alt="Логотип Место"
        src={headerLogo}
      />
      {loggedIn
        ? (<div className="header__actions">
            <p className="header__login">{currentUser.email}</p>
            <button className='header__button' onClick={handleLogout}>Выйти</button>
          </div>)
        : (<Switch>
            <Route path={AppRoute.login}>
              <Link to={AppRoute.registration}>Зарегистрироваться</Link>
            </Route>
            <Route path={AppRoute.registration}>
              <Link to={AppRoute.login}>Войти</Link>
            </Route>
          </Switch>)}
    </header>
  )
}
