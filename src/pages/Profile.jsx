import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    carregando: false,
    description: '',
    email: '',
    image: '',
    name: '',
  };

  async componentDidMount() {
    this.setState({ carregando: true });
    const user = await getUser();
    const { description, email, image, name } = user;
    this.setState({ description, email, image, name, carregando: false });
  }

  render() {
    const {
      carregando,
      description,
      email,
      image,
      name,
    } = this.state;

    return (
      <div data-testid="page-profile">
        Profile
        <Header />
        {
          carregando ? (
            <Carregando />
          ) : (
            <section className="infos">
              <p>Nome</p>
              <p>{name}</p>
              <p>Email</p>
              <p>{email}</p>
              <p>Sobre</p>
              <p>{description}</p>
              <img data-testid="profile-image" src={ image } alt={ `Foto ${name}` } />
              <button type="button"><Link to="/profile/edit">Editar perfil</Link></button>
            </section>
          )
        }
      </div>
    );
  }
}
