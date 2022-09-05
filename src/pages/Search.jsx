import React from 'react';
import Header from '../Components/Header';

export default class Search extends React.Component {
  state = {
    buttonEnabled: false,
  };

  verificaBotao = (evento) => {
    if (evento.target.value.length >= 2) {
      this.setState({ buttonEnabled: true });
    }
  };

  render() {
    const { buttonEnabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.verificaBotao }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !buttonEnabled }
          >
            Buscar
          </button>
        </form>
      </div>
    );
  }
}
