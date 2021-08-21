import React, { useState, useEffect } from 'react';
// REDIRECT
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionsIndex';

import imageMain from '../../assets/images/logind.jpg';
import logo from '../../assets/images/logo_main.png';

import classes from './login.module.css';
import classesButons from '../../components/UI/buttons/butons.module.css';

function Home(props) {
  const [email, setEmail] = useState('guest@tgb.com');
  const [password, setPassword] = useState('guest123');
  const [errMessageAux, setErrMessageAux] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (!props.messageToUser) {
      setErrMessageAux(null);
    } else {
      setErrMessageAux(
        <p className={classes.errorMessage}>{props.messageToUser}</p>
      );
      // ERASING ERROR MESSAGE:
      const timer = setTimeout(() => {
        setErrMessageAux(null);
        props.onEraseMessage();
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [props.messageToUser]);

  useEffect(() => {
    // SCROLL TO TOP ON PAGE LOAD:
    window.scrollTo(0, 0);
    props.onHideSideDrawer();
    setErrMessageAux(null);
    props.onEraseMessage();
  }, []);

  useEffect(() => {
    if (props.userIsLogged) {
      history.push('/home');
    }
  }, [props.userIsLogged]);

  const backHomeImgStyle = { backgroundImage: `url(${imageMain})` };

  function login(e, type) {
    e.preventDefault();
    props.onLogin(email, password, type);
  }

  return (
    <div>
      {/* <img src={imageMain} /> */}
      {/* ANCHOR self-closing DIV: */}
      <div id="start" style={{ position: 'absolute', top: '0px' }} />
      {/* HOME IMAGE */}
      <section className={classes.HomeImageContainer} style={backHomeImgStyle}>
        <div className={classes.LogoBox}>
          <img className={classes.LogoImage} src={logo} alt="" />
          <h2>Empreendimentos</h2>
        </div>
        <br /> <br />
        <form className={classes.FormStyle} onSubmit={(e) => login(e, '')}>
          <input
            type="email"
            value={email}
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            className={classesButons.BtnYellow}
            type="submit"
            value="LOGIN"
          />
          <br />
          <button
            className={classesButons.BtnGuest}
            onClick={(e) => login(e, 'guest')}
          >
            ENTER AS GUEST
          </button>
        </form>
        {errMessageAux}
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userIsLogged: state.login.isLogged,
    messageToUser: state.login.messageToUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHideSideDrawer: () => dispatch(actionTypes.hideSideDrawer()),
    onLogin: (email, password, type) =>
      dispatch(actionTypes.login(email, password, type)),
    onEraseMessage: () => dispatch(actionTypes.eraseMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
