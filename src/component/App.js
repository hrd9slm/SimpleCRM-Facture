import React, { Component } from 'react';
import CreerFacture from './CreerFacture';
import FactureList from './FactureList';
 import '../index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
    };
  }

  handleFactureAdded = () => {
    this.setState({ update: !this.state.update });
  };

  render() {
    return (
      <div className="App">
        <h1>Application de Facturation</h1>
        <CreerFacture onFactureAdded={this.handleFactureAdded} />
        <FactureList update={this.state.update} />
      </div>
    );
  }
}

export default App;
