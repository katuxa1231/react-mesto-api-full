import { useState } from 'react';

export function Login({ handleLogin }) {
  const [authData, setAuthData] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthData({ ...authData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!authData.email || !authData.password) {
      return;
    }

    handleLogin(authData.email, authData.password)
  }

  return (
    <div className="register">
      <h3 className="register__title">
        Вход
      </h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__input-wrapper form__input-wrapper_compact">
          <input className="form__input form__input_theme_dark" id="email" name="email" type="email" value={authData.email}
                 onChange={handleChange}
                 placeholder="Email"/>
        </div>
        <div className="form__input-wrapper form__input-wrapper_compact">
          <input className="form__input form__input_theme_dark" id="password" name="password" type="password" value={authData.password}
                 onChange={handleChange}
                 placeholder="Пароль"/>
        </div>
        <button className="form__submit-button form__submit-button_theme_dark register__button" type="submit" onSubmit={handleSubmit}>Войти</button>
      </form>
    </div>
  )
}
