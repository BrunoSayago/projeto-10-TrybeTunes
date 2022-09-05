import React from 'react';
import Header from '../Components/Header';

export default class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />
      </div>
    );
  }
}
