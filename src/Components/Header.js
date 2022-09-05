import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

export default class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    this.carregandoUsuario();
  }

  carregandoUsuario = async () => {
    const { name } = await getUser();
    this.setState({ loading: false, userName: name });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <header data-testid="header-component">
        Header
        <div data-testid="header-user-name">
          { loading ? <Carregando /> : <span>{ userName }</span>}
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
