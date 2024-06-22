import React, { Component } from 'react';


class AjouterDetailsFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      idFacture: '', 
      societe: 'societe ABC', // Valeur par défaut
      date: '', 
      client: {
        id: 0,
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
      },
      clients: JSON.parse(localStorage.getItem('clients')) || [],
    };
    this.clientIdCounter = this.state.clients.length;
  }

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nom' || name === 'adresse' || name === 'telephone' || name === 'email') {
      this.setState(prevState => ({
        client: {
          ...prevState.client,
          [name]: value
        }
      }));
    } if (value === 'togglePopup') {
      this.togglePopup();
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmitClient = (e) => {
    e.preventDefault();
    const { client } = this.state;
    localStorage.setItem('client', JSON.stringify(client));
    this.setState({
      client: {
        id: 0,
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
      },
      showPopup: false,
    });
  };

  handleSubmitFacture = (e) => {
    e.preventDefault();
    const { idFacture, societe, date } = this.state;
    const { articles } = this.props;

    const client = JSON.parse(localStorage.getItem('client')) || {
      id: 0,
      nom: '',
      adresse: '',
      telephone: '',
      email: '',
    };

    const facture = {
      id: idFacture,
      societe: societe,
      date: date,
      client: client,
      articles: articles,
    };

    let factures = JSON.parse(localStorage.getItem('factures')) || [];
    factures.push(facture);
    localStorage.setItem('factures', JSON.stringify(factures));

    // Reset client and clear localStorage
    localStorage.removeItem('client');

    this.setState({
      idFacture: '',
      societe: 'societe ABC',
      date: '',
      client: {
        id: 0,
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
      },
    });

    this.props.onResetArticles();
    if (this.props.onFactureAdded) {
      this.props.onFactureAdded();
    }
  };

  render() {
    const { articles } = this.props;
    const { idFacture, societe, date } = this.state;
    const { nom, adresse, telephone, email } = this.state.client;

    return (
      <div className="AjouterDetailsFacture">
        <h3>Ajouter Facture</h3>
        <form onSubmit={this.handleSubmitFacture}>
          <input
            type="text"
            name="idFacture"
            placeholder="Id Facture"
            value={idFacture}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="date"
            name="date"
            value={date}
            onChange={this.handleInputChange}
            required
          />
          <select name="societe" value={societe} onChange={this.handleInputChange}>
            <option value="societe ABC">societe ABC</option>
            <option value="societe telecom">societe telecom</option>
            <option value="societe reseau">societe reseau</option>
            <option value="societe vema">societe vema</option>
            <option value="togglePopup">Ajouter Client</option>
          </select>
         
          <button type="submit" disabled={articles.length === 0}>Créer la Facture</button>
        </form>

        {this.state.showPopup && (
          <div className="popup">
           <div className="popup-inner">
  <h4>Ajouter un Client</h4>
  <form onSubmit={this.handleSubmitClient}>
 
      <input
        type="text"
        name="nom"
        value={nom}
        onChange={this.handleInputChange}
        placeholder='Nom Client'
        required
      />

      <input
        type="text"
        name="adresse"
        value={adresse}
        onChange={this.handleInputChange}
        placeholder='Adresse'
        required
      />
  
      <input
        type="tel"
        name="telephone"
        value={telephone}
        onChange={this.handleInputChange}
        placeholder='Téléphone'
        required
      />
  
      <input
        type="email"
        name="email"
        value={email}
        onChange={this.handleInputChange}
        placeholder='Email'
        required
      />
  
    <button type="submit">Enregistrer</button>
    <button type="button" onClick={this.togglePopup}></button>
  </form>
</div>

          </div>
        )}
      </div>
    );
  }
}

export default AjouterDetailsFacture;
