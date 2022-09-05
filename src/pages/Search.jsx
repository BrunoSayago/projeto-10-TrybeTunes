import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../Components/Carregando';

export default class Search extends React.Component {
  state = {
    busca: '',
    carregando: false,
    carregado: false,
    artistaBuscado: '',
    buttonEnabled: false,
    retorno: '',
  };

  mudaPesquisa = ({ target }) => {
    this.setState({ busca: target.value });
    if (target.value.length >= 2) {
      this.setState({ buttonEnabled: true });
    }
  };

  buttonClick = async (artista) => {
    this.setState({ carregando: true, artistaBuscado: artista });
    const retorno = await searchAlbumsAPI(artista);
    this.setState({ carregado: true, retorno, carregando: false, busca: '' });
  };

  dadosTratados = (retorno) => {
    if (retorno.length === 0) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
    return retorno.map(({ collectionName, artistName, collectionId }) => (
      <Link
        key={ collectionId }
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <p>{ collectionName }</p>
        <p>{artistName}</p>
      </Link>
    ));
  };

  render() {
    const {
      busca,
      carregando,
      carregado,
      artistaBuscado,
      buttonEnabled,
      retorno,
    } = this.state;

    const achouAlbuns = retorno.length > 0;

    const resultado = <p>{`Resultado de álbuns de: ${artistaBuscado}`}</p>;

    const inicial = (
      <form>
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.mudaPesquisa }
          value={ busca }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ !buttonEnabled }
          onClick={ () => this.buttonClick(busca) }
        >
          Buscar
        </button>
      </form>
    );

    return (
      <div data-testid="page-search">
        <Header />
        {!carregando && inicial}
        {carregando && <Carregando />}
        {!carregando && carregado && achouAlbuns && resultado}
        {carregado && this.dadosTratados(retorno)}
      </div>
    );
  }
}
