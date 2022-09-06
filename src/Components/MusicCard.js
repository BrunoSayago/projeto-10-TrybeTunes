import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = { carregando: false };

  favoritar = async () => {
    const { objeto } = this.props;
    this.setState({ carregando: true });
    await addSong(objeto);
    this.setState({ carregando: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando } = this.state;
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
  objeto: PropTypes.object,
}.isRequired;
