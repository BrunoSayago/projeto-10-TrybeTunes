import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../Components/Carregando';
import MusicCard from '../Components/MusicCard';

export default class Favorites extends React.Component {
  state = {
    favoritas: [],
    carregando: false,
  };

  componentDidMount() {
    this.montaFavoritas();
  }

  shouldComponentUpdate(_, estadoNovo) {
    const { favoritas } = this.state;
    return favoritas !== estadoNovo.favoritas;
  }

  async componentDidUpdate() {
    this.montaFavoritas();
  }

  montaFavoritas = async () => {
    this.setState({ carregando: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ favoritas, carregando: false });
  };

  render() {
    const { favoritas, carregando } = this.state;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        { carregando && <Carregando /> }
        {
          (favoritas === null || favoritas.length === 0)
            ? <p>Não há músicas favoritas</p>
            : (
              favoritas.map((song) => (
                <MusicCard
                  key={ song.trackName }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  musica={ song }
                  favoritas={ favoritas }
                />
              ))

            )
        }
      </div>
    );
  }
}
