import React from 'react';
import Header from '../Components/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        Profile
        <Header />
      </div>
    );
  }
}
