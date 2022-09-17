import { Redirect, Route } from 'react-router-dom';
import { AppRoute } from '../utils/constants';

export function ProtectedRoute({component: Component, ...props}) {
  return (
    <Route>
      {() => props.loggedIn ? <Component {...props} /> : <Redirect to={AppRoute.login} />}
    </Route>
  )
}
