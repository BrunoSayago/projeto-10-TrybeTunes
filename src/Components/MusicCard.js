import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    carregando: false,
    favorita: false,
  };

  componentDidMount() {
    this.checaFavorita();
  }

  favoritar = async (evento) => {
    const { musica } = this.props;
    const { favorita } = this.state;
    const estado = evento.target.checked;
    this.setState({ carregando: true });
    if (estado === true) {
      await addSong(musica);
    } else {
      await removeSong(musica);
    }
    await getFavoriteSongs();
    this.setState({ carregando: false, favorita: !favorita });
  };

  checaFavorita = () => {
    const { musica, favoritas } = this.props;
    const validaFavorita = favoritas.some((song) => song.trackId === musica.trackId);
    this.setState({ favorita: validaFavorita });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando, favorita } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ this.favoritar }
            checked={ favorita }
          />
          <p>{carregando && <Carregando />}</p>
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  musica: PropTypes.object,
}.isRequired;
