import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../Components/Carregando';

export default class Album extends React.Component {
  state = {
    carregando: false,
    favoritas: [],
    colecao: {},
    musicas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ carregando: true });
    const favoritas = await getFavoriteSongs();
    const dadosAlbum = await getMusics(id);
    const colecao = dadosAlbum.filter((_, index) => index === 0)[0];
    const musicas = dadosAlbum.filter((_, index) => index !== 0);
    this.setState({ carregando: false, favoritas, colecao, musicas });
  }

  render() {
    const { carregando, colecao, musicas, favoritas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{colecao.artistName}</p>
        <p data-testid="album-name">{colecao.collectionName}</p>
        { carregando && <Carregando />}
        {musicas.map((elemento) => (
          <MusicCard
            key={ elemento.trackName }
            trackName={ elemento.trackName }
            previewUrl={ elemento.previewUrl }
            trackId={ elemento.trackId }
            musica={ elemento }
            favoritas={ favoritas }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
