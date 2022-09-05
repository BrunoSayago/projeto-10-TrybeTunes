import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../Components/Carregando';

export default class Login extends React.Component {
  state = {
    username: '',
    buttonEnabled: false,
    loading: false,
    redirect: false,
  };

  mudaNome = (evento) => {
    this.setState({ username: evento.target.value });
    const minLength = 3;
    if (evento.target.value.length >= minLength) {
      this.setState({ buttonEnabled: true });
    } else {
      this.setState({ buttonEnabled: false });
    }
  };

  saveButton = async () => {
    const { username } = this.state;
    this.setState({ loading: true });
    await createUser({ name: username });
    this.setState({ redirect: true });
  };

  render() {
    const { username, buttonEnabled, loading, redirect } = this.state;

    return (
      redirect ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            { !loading
              ? (
                <form>
                  <input
                    value={ username }
                    data-testid="login-name-input"
                    type="text"
                    onChange={ this.mudaNome }
                  />
                  <button
                    data-testid="login-submit-button"
                    type="button"
                    disabled={ !buttonEnabled }
                    onClick={ this.saveButton }
                  >
                    Entrar
                  </button>
                </form>
              )
              : <Carregando />}
          </div>
        )

    );
  }
}
