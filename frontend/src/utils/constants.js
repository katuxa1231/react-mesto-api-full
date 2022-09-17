export const TooltipType = {
  success: 'success',
  failure: 'failure'
}

export const AppRoute = {
  root: `/`,
  login: `/sign-in`,
  registration: `/sign-up`
};

export const tooltipMessage = {
  registration: {
    [TooltipType.success]: 'Вы успешно зарегистрировались!',
    [TooltipType.failure]: 'Что-то пошло не так! Попробуйте ещё раз.'
  }
}
