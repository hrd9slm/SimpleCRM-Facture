import React, { Component } from 'react';

class FactureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factures: [],
      tva: 0.2, 
      selectedFactureId: null,
    };
  }

  componentDidMount() {
    this.loadFactures();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.update !== this.props.update) {
      this.loadFactures();
    }
  }

  loadFactures = () => {
    const factures = JSON.parse(localStorage.getItem('factures')) || [];
    this.setState({ factures });
  };

  calculateMontantHT = (articles) => {
    return articles.reduce((total, article) => total + article.amount, 0);
  };

  calculateMontantTVA = (montantHT) => {
    return montantHT * this.state.tva;
  };

  calculateMontantTTC = (montantHT, montantTVA) => {
    return montantHT + montantTVA;
  };

  handleDetailsClick = (factureId) => {
    this.setState({ selectedFactureId: factureId });
  };

  render() {
    const { factures, selectedFactureId } = this.state;

    return (
      <div className="FactureList">
        <h3>Liste des Factures</h3>
        <table border="1" cellPadding="3" cellSpacing="0">
          <thead>
            <tr>
              <th>ID Facture</th>
              <th>Société</th>
              <th>Date</th>
              <th>Client</th>
              <th>Adresse</th>
              <th>Montant HT</th>
              <th>Montant TVA</th>
              <th>Montant TTC</th>
              <th>Détail Facture</th>
            </tr>
          </thead>
          <tbody>
            {factures.map(facture => {
              const montantHT = this.calculateMontantHT(facture.articles);
              const montantTVA = this.calculateMontantTVA(montantHT);
              const montantTTC = this.calculateMontantTTC(montantHT, montantTVA);

              return (
                <tr key={facture.id}>
                  <td>{facture.id}</td>
                  <td>{facture.societe}</td>
                  <td>{facture.date}</td>
                  <td>{facture.client.nom}</td>
                  <td>{facture.client.adresse}</td>
                  <td>{montantHT.toFixed(2)}</td>
                  <td>{montantTVA.toFixed(2)}</td>
                  <td>{montantTTC.toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => this.handleDetailsClick(facture.id)}>Voir Détails</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedFactureId !== null && (
          <div>
            <h3>Détails de la Facture {selectedFactureId}</h3>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID Article</th>
                  <th>Nom Article</th>
                  <th>Quantité</th>
                  <th>Remise</th>
                  <th>Prix Unité</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {factures.map(facture => {
                  if (facture.id === selectedFactureId) {
                    return facture.articles.map(article => (
                      <tr key={article.id}>
                        <td>{article.id}</td>
                        <td>{article.name}</td>
                        <td>{article.quantity}</td>
                        <td>{article.discount}</td>
                        <td>{article.price}</td>
                        <td>{article.amount}</td>
                      </tr>
                    ));
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default FactureList;
