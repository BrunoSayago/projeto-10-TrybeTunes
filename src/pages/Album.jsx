import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

export default class Album extends React.Component {
  state = {
    colecao: {},
    musicas: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const dadosAlbum = await getMusics(id);
    const colecao = dadosAlbum.filter((_, i) => i === 0)[0];
    const musicas = dadosAlbum.filter((_, i) => i !== 0);
    this.setState({ colecao, musicas });
  }

  render() {
    const { colecao, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{colecao.artistName}</p>
        <p data-testid="album-name">{colecao.collectionName}</p>
        {musicas.map(({ trackName, previewUrl }) => (
          <MusicCard
            key={ trackName }
            trackName={ trackName }
            previewUrl={ previewUrl }
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
