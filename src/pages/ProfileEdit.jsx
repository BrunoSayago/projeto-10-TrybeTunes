import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from '../Components/Carregando';

export default class ProfileEdit extends React.Component {
  state = {
    carregando: false,
    description: '',
    email: '',
    image: '',
    name: '',
    buttonDisabled: true,
    redirect: false,
  };

  async componentDidMount() {
    this.setState({ carregando: true });
    const user = await getUser();
    const { description, email, image, name } = user;
    this.setState(
      { description, email, image, name, carregando: false },
      () => this.checaValores(),
    );
  }

  mudaEstado = (evento) => {
    const valor = evento.target.value;
    const info = evento.target.name;
    this.setState({ [info]: valor }, () => this.checaValores());
  };

  checaValores = () => {
    const { name, image, description } = this.state;
    if (this.checaEmail() && name && image && description) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  checaEmail = () => {
    const { email } = this.state;
    const INDEX = -1;
    if (email) {
      return (
        !(email === '' || email.indexOf('@') === INDEX || email.indexOf('.') === INDEX)
      );
    }
  };

  enviaForm = async () => {
    const { name, email, image, description } = this.state;
    const objUser = {
      name,
      email,
      image,
      description,
    };
    this.setState({ carregando: true });
    await updateUser(objUser);
    this.setState({ redirect: true });
  };

  render() {
    const {
      carregando,
      description,
      email,
      image,
      name,
      buttonDisabled,
      redirect,
    } = this.state;
    if (redirect) return <Redirect to="/profile" />;

    return (
      <div data-testid="page-profile-edit">
        Profile Edit
        <Header />
        {
          carregando ? (
            <Carregando />
          ) : (
            <form>
              <label htmlFor="changeName">
                Alterar Nome
                <input
                  type="text"
                  data-testid="edit-input-name"
                  id="changeName"
                  value={ name }
                  name="name"
                  onChange={ this.mudaEstado }
                />
              </label>

              <label htmlFor="changeEmail">
                Alterar E-mail
                <input
                  type="email"
                  data-testid="edit-input-email"
                  id="changeEmail"
                  name="email"
                  value={ email }
                  onChange={ this.mudaEstado }
                />
              </label>

              <label htmlFor="changeDescription">
                Alterar Descrição
                <textarea
                  data-testid="edit-input-description"
                  id="changeDescription"
                  name="description"
                  value={ description }
                  onChange={ this.mudaEstado }
                />
              </label>

              <label htmlFor="changeImage">
                Alterar Foto de Perfil
                <input
                  type="text"
                  data-testid="edit-input-image"
                  id="changeImage"
                  name="image"
                  value={ image }
                  onChange={ this.mudaEstado }
                />
              </label>

              <button
                type="button"
                data-testid="edit-button-save"
                onClick={ this.enviaForm }
                disabled={ buttonDisabled }
              >
                Salvar Alterações
              </button>
            </form>
          )
        }
        {
          redirect && <Redirect to="/profile" />
        }

      </div>
    );
  }
}
