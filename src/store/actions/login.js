import * as actionTypes from './actionsTypes';

export const login = (email, password, type) => {
  let error = false;
  return (dispatch) => {
    // fetch().then().catch();
    // INSIDE THEN():
    if (type === 'guest') {
      dispatch(loginExec('guest@tgb.com', 'guest123', error));
    } else if (email !== 'guest@tgb.com') {
      // EMAIL NÃO CADASTRADO
      dispatch(loginExec(false, password, 'Email não cadastrado!'));
    } else if (password !== 'guest123') {
      // SENHA INVÁLIDA
      dispatch(loginExec(email, false, 'Senha incorreta!'));
    } else {
      dispatch(loginExec(email, password, error));
    }
  };
};

export const loginExec = (email, password, error) => {
  if (!email) {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: error,
    };
  } else if (!password) {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: error,
    };
  } else if (error) {
    return {
      type: actionTypes.LOGIN,
      validLogin: false,
      errMessage: 'Erro de conexão. Favor entrar em contato.',
    };
  } else {
    return {
      type: actionTypes.LOGIN,
      validLogin: true,
      email: email,
    };
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const eraseMessage = () => {
  return {
    type: actionTypes.ERASE_MESSAGE,
  };
};
