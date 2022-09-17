import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register({handleRegister}) {
  const [registerData, setRegisterData] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleRegister(registerData.email, registerData.password)
  }

  return (
    <div className="register">
      <h3 className="register__title">
        Регистрация
      </h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__input-wrapper form__input-wrapper_compact">
          <input className="form__input form__input_theme_dark" id="email" name="email" type="email"
                 value={registerData.email} onChange={handleChange}
                 placeholder="Email"/>
        </div>
        <div className="form__input-wrapper form__input-wrapper_compact">
          <input className="form__input form__input_theme_dark" id="password" name="password" type="password"
                 value={registerData.password} onChange={handleChange}
                 placeholder="Пароль"/>
        </div>
        <button className="form__submit-button form__submit-button_theme_dark register__button" type="submit" onSubmit={handleSubmit}>Зарегистрироваться</button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  )
}
